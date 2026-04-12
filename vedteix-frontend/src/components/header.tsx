"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "./logo";
import { navLinks as mainNavLinks } from "@/lib/navigation-data";
import { careersNavLinks } from "@/lib/careers-navigation-data";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

function MainHeader({ initialTheme }: { initialTheme: "dark" | "light" }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled
          ? "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-background"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <span className="hidden whitespace-nowrap font-bold text-foreground sm:inline-block">
            {t("brand.short")}
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNavLinks.map((link) => (
              <NavigationMenuItem key={link.labelKey}>
                {link.href ? (
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t(link.labelKey)}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger>{t(link.labelKey)}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {link.isMegaMenu ? (
                        <div className="grid w-[600px] grid-cols-[.75fr_1fr] gap-4 p-4 md:w-[700px] lg:w-[800px]">
                          <ul className="flex flex-col gap-2">
                            {link.categories?.map((category) => (
                              <ListItem
                                key={category.id}
                                title={t(category.titleKey)}
                                href={category.href}
                              >
                                {t(category.descriptionKey)}
                              </ListItem>
                            ))}
                          </ul>
                          <div className="grid grid-cols-2 gap-4">
                            {link.items?.map((item) => (
                              <ListItem
                                key={item.titleKey}
                                title={t(item.titleKey)}
                                href={item.href}
                              >
                                {""}
                              </ListItem>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
                          {link.items?.map((item) => (
                            <ListItem
                              key={item.titleKey}
                              title={t(item.titleKey)}
                              href={item.href}
                            >
                              {item.descriptionKey ? t(item.descriptionKey) : ""}
                            </ListItem>
                          ))}
                        </ul>
                      )}
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-1 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle initialTheme={initialTheme} />
          <Button asChild className="ml-1">
            <Link href="/contact">{t("header.getStarted")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle initialTheme={initialTheme} />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t("header.toggleMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
              <div className="p-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-6 mr-6 flex items-center gap-2"
                >
                  <Logo className="h-8 w-8" />
                  <span className="font-bold">{t("brand.short")}</span>
                </Link>
                <Accordion type="multiple" className="w-full">
                  {mainNavLinks.map((link, index) =>
                    link.href ? (
                      <Link
                        key={link.labelKey}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex w-full items-center border-b py-4 text-lg font-medium"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ) : (
                      <AccordionItem value={`item-${index}`} key={link.labelKey}>
                        <AccordionTrigger className="text-lg">{t(link.labelKey)}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-2 pl-4">
                            {link.isMegaMenu ? (
                              <>
                                {link.categories?.map((category) => (
                                  <li key={category.id}>
                                    <h4 className="mb-2 font-semibold text-primary">
                                      {t(category.titleKey)}
                                    </h4>
                                    <ul className="flex flex-col gap-2 pl-2">
                                      {link.items
                                        ?.filter((item) => item.categoryId === category.id)
                                        .map((item) => (
                                          <li key={item.titleKey}>
                                            <Link
                                              href={item.href || "/services"}
                                              onClick={() => setMobileMenuOpen(false)}
                                              className="block py-1 text-muted-foreground hover:text-primary"
                                            >
                                              {t(item.titleKey)}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </li>
                                ))}
                              </>
                            ) : (
                              link.items?.map((item) => (
                                <li key={item.titleKey}>
                                  <Link
                                    href={item.href || "/"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 text-muted-foreground hover:text-primary"
                                  >
                                    {t(item.titleKey)}
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
                <Button asChild className="mt-6 w-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    {t("header.getStarted")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function CareersHeader({ initialTheme }: { initialTheme: "dark" | "light" }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-colors duration-300 supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "border-border/40" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <span className="hidden font-bold text-foreground sm:inline-block">{t("brand.short")}</span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {careersNavLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                {link.items ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent text-sm">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
                        {link.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={link.href || "/careers"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-sm",
                        link.isHighlighted && "font-bold"
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-1 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle initialTheme={initialTheme} />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle initialTheme={initialTheme} />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t("header.toggleMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
              <div className="p-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-6 mr-6 flex items-center gap-2"
                >
                  <Logo className="h-8 w-8" />
                  <span className="font-bold">{t("brand.short")}</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {careersNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href || "/careers"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn("text-base", link.isHighlighted && "font-bold text-primary")}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Header({ initialTheme }: { initialTheme: "dark" | "light" }) {
  const pathname = usePathname();
  const isCareersPage = pathname.startsWith("/careers");

  if (isCareersPage) {
    return <CareersHeader initialTheme={initialTheme} />;
  }

  return <MainHeader initialTheme={initialTheme} />;
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "/"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children ? (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          ) : null}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

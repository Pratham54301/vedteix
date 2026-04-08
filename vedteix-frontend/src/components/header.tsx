
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect, forwardRef } from "react";
import { Logo } from "./logo";
import { navLinks as mainNavLinks } from "@/lib/navigation-data";
import { careersNavLinks } from "@/lib/careers-navigation-data";
import { ThemeToggle } from "./theme-toggle";

const MainHeader = ({ initialTheme }: { initialTheme: "dark" | "light" }) => {
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
        <header className={cn(
            "sticky top-0 z-50 w-full border-b transition-colors duration-300",
            isScrolled ? "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "border-transparent bg-background"
          )}>
            <div className="container flex h-20 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="h-10 w-10" />
                <span className="hidden font-bold text-foreground sm:inline-block whitespace-nowrap">VEDTEIX TECHNOLOGY</span>
              </Link>
              
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {mainNavLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                      {link.href ? (
                         <Link href={link.href} legacyBehavior passHref>
                           <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                             {link.label}
                           </NavigationMenuLink>
                         </Link>
                      ) : (
                        <>
                          <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            {link.isMegaMenu ? (
                              <div className="grid w-[600px] grid-cols-[.75fr_1fr] gap-4 p-4 md:w-[700px] lg:w-[800px]">
                                <ul className="flex flex-col gap-2">
                                  {link.categories?.map((category) => (
                                    <ListItem
                                      key={category.title}
                                      title={category.title}
                                      href={category.href}
                                    >
                                      {category.description}
                                    </ListItem>
                                  ))}
                                </ul>
                                <div className="grid grid-cols-2 gap-4">
                                  {link.items?.map((item) => (
                                      <ListItem key={item.title} title={item.title} href={item.href}>
                                          {item.description}
                                      </ListItem>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
                                {link.items?.map((item) => (
                                  <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                  >
                                    {item.description}
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
      
              <div className="hidden lg:flex items-center gap-2">
                  <ThemeToggle initialTheme={initialTheme} />
                  <Button asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
              </div>
              
              <div className="flex items-center gap-2 lg:hidden">
                  <ThemeToggle initialTheme={initialTheme} />
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[340px]">
                      <div className="p-4">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mr-6 flex items-center gap-2 mb-6">
                          <Logo className="h-8 w-8" />
                          <span className="font-bold">VEDTEIX TECHNOLOGY</span>
                        </Link>
                        <Accordion type="multiple" className="w-full">
                          {mainNavLinks.map((link, index) => 
                            link.href ? (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex w-full items-center py-4 text-lg font-medium border-b"
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <AccordionItem value={`item-${index}`} key={link.label}>
                                 <AccordionTrigger className="text-lg">{link.label}</AccordionTrigger>
                                 <AccordionContent>
                                      <ul className="flex flex-col gap-2 pl-4">
                                      {link.isMegaMenu ? (
                                          <>
                                              {link.categories?.map((category) => (
                                                  <li key={category.title}>
                                                      <h4 className="font-semibold text-primary mb-2">{category.title}</h4>
                                                      <ul className="flex flex-col gap-2 pl-2">
                                                          {link.items?.filter(item => item.category === category.title).map(item => (
                                                              <li key={item.title}>
                                                                  <Link href={item.href || '/services'} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-muted-foreground hover:text-primary">
                                                                      {item.title}
                                                                  </Link>
                                                              </li>
                                                          ))}
                                                      </ul>
                                                  </li>
                                              ))}
                                          </>
                                      ) : (
                                          link.items?.map((item) => (
                                              <li key={item.title}>
                                                  <Link href={item.href || '/'} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-muted-foreground hover:text-primary">
                                                      {item.title}
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
                          <Link href="/contact">Get Started</Link>
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
              </div>
            </div>
          </header>
    )
}

const CareersHeader = ({ initialTheme }: { initialTheme: "dark" | "light" }) => {
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
        <header className={cn(
            "sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            isScrolled ? "border-border/40" : "border-transparent"
          )}>
            <div className="container flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Logo className="h-8 w-8" />
                <span className="hidden font-bold text-foreground sm:inline-block">VEDTEIX</span>
              </Link>
              
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {careersNavLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                      {link.items ? (
                        <>
                          <NavigationMenuTrigger className="text-sm bg-transparent">
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
                          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-sm", link.isHighlighted && "font-bold")}>
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
      
              <div className="hidden items-center gap-2 lg:flex">
                  <ThemeToggle initialTheme={initialTheme} />
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                  <ThemeToggle initialTheme={initialTheme} />
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[340px]">
                      <div className="p-4">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="mr-6 flex items-center gap-2 mb-6">
                          <Logo className="h-8 w-8" />
                          <span className="font-bold">VEDTEIX TECHNOLOGY</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {careersNavLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href || '/careers'}
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
    )
}

export function Header({ initialTheme }: { initialTheme: "dark" | "light" }) {
  const pathname = usePathname();
  const isCareersPage = pathname.startsWith('/careers');

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
          href={href || '/'}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

    

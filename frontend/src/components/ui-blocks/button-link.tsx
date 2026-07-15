import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ButtonProps = ComponentProps<typeof Button>;

interface ButtonLinkProps extends Omit<ButtonProps, "render" | "nativeButton"> {
  href: string;
  external?: boolean;
  children: ReactNode;
}

/**
 * A shadcn/base-ui Button that renders as an anchor/Link.
 * base-ui uses the `render` prop (not `asChild`) and needs `nativeButton=false`
 * when the rendered element isn't a real <button>. This wraps that pattern.
 */
export function ButtonLink({
  href,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  const element = external ? (
    <a href={href} target="_blank" rel="noreferrer" />
  ) : (
    <Link href={href} />
  );

  return (
    <Button nativeButton={false} render={element} {...props}>
      {children}
    </Button>
  );
}

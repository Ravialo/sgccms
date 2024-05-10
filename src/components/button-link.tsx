import Link from "next/link";

import { Button, ButtonProps } from "./ui/button";

export type ButtonLinkProps = ButtonProps & {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

function ButtonLink({ href, icon, children, ...props }: ButtonLinkProps) {
  const Icon = icon;

  return (
    <Link href={href}>
      <Button {...props}>
        {Icon && <Icon className="h-4 w-4 mr-2" />}

        {children}
      </Button>
    </Link>
  );
}
export default ButtonLink;

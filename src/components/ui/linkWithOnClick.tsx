import NextLink, { LinkProps as NextLinkProps } from "next/link";

const Link: React.FC<NextLinkProps & { className?: string; onClick?: () => void }> = ({
  href,
  children,
  onClick = () => {},
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a onClick={onClick} {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;

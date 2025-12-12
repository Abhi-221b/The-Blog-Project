export type ButtonProps = {
    className?: string,
    children: React.ReactNode,
} & React.HtmlHTMLAttributes<HTMLButtonElement>

export default function Button({className, children, ...props}: ButtonProps) {
    
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}
 
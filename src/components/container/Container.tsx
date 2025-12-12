
type ContainerProps = {
    width?: number;
    unit?: "%" | "px";
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({
    width = 1440,
    unit = "px",
    className,
    children,
    ...props
}: ContainerProps) {

    let finalWidth = width;
    let styleValue;

    if (unit === "%") {
        finalWidth = Math.min(100, Math.max(50, width));
        styleValue = { width: `${finalWidth}${unit}` }
    } else {
        finalWidth = Math.min(2500, Math.max(500, width));
        styleValue = { maxWidth: `${finalWidth}${unit}` }
    }


    return (
        <div
            className={`page-center px-4 m-auto ${className || ""}`}
            style={{ ...styleValue }}
            {...props}
        >
            {children}
        </div>
    );
}

export default Container;

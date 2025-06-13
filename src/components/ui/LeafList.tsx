
interface LeafListProps {
    items: string[];
    className?: string;
    iconSize?: 'small' | 'medium' | 'large';
}

/**
 * A list component that uses the leaf icon as bullet points
 */
export default function LeafList({ items, className = '', iconSize = 'medium' }: LeafListProps) {
    // Map the iconSize prop to actual Tailwind classes
    const sizeClasses = {
        small: 'h-3 w-auto',
        medium: 'h-4 w-auto',
        large: 'h-5 w-auto',
    };

    const iconClass = sizeClasses[iconSize];

    return (
        <ul className={`space-y-2 rtl ${className}`}>
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <img
                        src="/assets/images/leaf.png"
                        alt=""
                        className={`${iconClass} mt-1 flex-shrink-0`}
                    />
                    <span className="text-gray-700">{item}</span>
                </li>
            ))}
        </ul>
    );
}
import { Icon } from '@/shared/ui/Icons';

interface MenuItemProps {
  label: string;
  onClick?: () => void;
}

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <section>
      <h3 className="body-18-bold text-white mb-4">{title}</h3>
      <ul className="space-y-1 caption-16-regular">
        {items.map((item) => (
          <li
            key={item.label}
            className="hover:text-white cursor-pointer flex items-center justify-between group"
            onClick={item.onClick}
          >
            <span>{item.label}</span>
            <Icon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-white" />
          </li>
        ))}
      </ul>
    </section>
  );
}

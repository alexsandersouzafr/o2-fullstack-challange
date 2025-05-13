import { Book, Computer, Shirt, Sofa, Utensils } from "lucide-react";

export const categoryStyles = [
  {
    id: 1,
    color: "bg-red-200 dark:bg-red-600/50",
    icon: <Sofa className="h-4 w-4" />,
  },
  {
    id: 2,
    color: "bg-orange-200 dark:bg-orange-600/50",
    icon: <Computer className="h-4 w-4" />,
  },
  {
    id: 3,
    color: "bg-pink-200 dark:bg-pink-600/50",
    icon: <Shirt className="h-4 w-4" />,
  },
  {
    id: 4,
    color: "bg-teal-200 dark:bg-teal-600/50",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: 5,
    color: "bg-amber-200 dark:bg-amber-600/50",
    icon: <Book className="h-4 w-4" />,
  },
];

import { cn } from "@/lib/utils";
interface MainLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string | React.ReactNode;
  children: React.ReactNode;
}
export function MainLayout({ title, children, className,id }: MainLayoutProps) {
  return (
    <div >
      <h2 className="font-Montserrat text-4xl font-semibold my-12">{title} </h2>
      <div
        className={cn(
          `border border-light-gray p-10 min-h-screen rounded-xl `,
          className
        )}
        id={id}
      >
        {children}
      </div>
    </div>
  );
}

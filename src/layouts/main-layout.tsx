export function MainLayout({
  title,
  children,
}: {
  title: string |  React.ReactNode ;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-Montserrat text-4xl font-semibold my-12">{title} </h2>
      <div className="border border-light-gray p-10 min-h-screen rounded-xl ">
        {children}
      </div>
    </div>
  );
}

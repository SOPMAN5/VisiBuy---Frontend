type UserProfileCardProps = {
  fullName: string;
  imgSrc?: string;
};
export function UserProfileCard({ fullName, imgSrc }: UserProfileCardProps) {
  return (
    <div className="flex items-center">
      <div
        className="h-16 w-16 rounded-full flex border-2 border-blue"
        style={{
          backgroundImage: `url(${imgSrc ? imgSrc : "/default-user-img.jpg"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      ></div>
      <span className="pl-4">
        <h2 className="font-OpenSans font-semibold text-2xl">{fullName}</h2>
      </span>
    </div>
  );
}

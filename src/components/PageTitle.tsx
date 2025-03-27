export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="relative h-[50px] mt-2">
      <div className="text-center py-4 bg-gradient-to-b from-transparent bg-green-800 to-black/80">
        <h1 className="md:text-4xl text-3xl text-white font-bold">{title}</h1>
      </div>
    </div>
  );
}

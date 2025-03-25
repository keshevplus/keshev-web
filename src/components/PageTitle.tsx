export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="relative h-[100px] mt-12">
      <div className="text-center py-8 bg-gradient-to-b from-transparent bg-green-800 to-black/80">
        <h1 className="text-5xl text-white font-bold">{title}</h1>
      </div>
    </div>
  );
}

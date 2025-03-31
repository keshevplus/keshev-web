export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="relative mb-8">
      <div className="text-center py-8 bg-gradient-to-b from-green-800 to-green-900/90">
        <h1 className="md:text-4xl text-3xl text-white font-bold">{title}</h1>
      </div>
    </div>
  );
}

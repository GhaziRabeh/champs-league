import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Header() {
  return (
    <Card className="w-full border-b border-white/10 bg-[#0A1428]">
      <CardContent className="flex flex-col items-center p-4 gap-4">
        <Image
          src="/logo/logo.png"
          alt="riot games"
          width={100}
          height={24}
          className="text-[min(10vw,50px)]"
        />
        <h1 className="text-2xl font-extrabold text-[#eb0029] text-center">
          Welcome To League Of Legends
        </h1>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-8 text-center">
      <Compass className="size-14 stroke-1 text-forest" />
      <p className="text-xs tracking-widest text-muted-foreground">
        PLACE NOT FOUND
      </p>
      <h1 className="text-3xl font-medium tracking-tight">
        A little off the beaten path
      </h1>
      <p className="text-sm text-muted-foreground">
        Your next good place is still out there.
      </p>
      <Link className={buttonVariants({ size: "lg" })} href="/">
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
    </main>
  );
}

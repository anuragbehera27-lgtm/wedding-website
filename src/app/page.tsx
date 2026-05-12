import { Hero }       from "@/components/Hero";
import { Countdown }  from "@/components/Countdown";
import { Story }      from "@/components/Story";
import { PhotoStrip } from "@/components/PhotoStrip";
import { Details }    from "@/components/Details";
import { Schedule }   from "@/components/Schedule";
import { Travel }     from "@/components/Travel";
import { Registry }   from "@/components/Registry";
import { Rsvp }       from "@/components/Rsvp";
import { Footer }     from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <Story />
      <PhotoStrip />
      <Details />
      <Schedule />
      <Travel />
      <Registry />
      <Rsvp />
      <Footer />
    </main>
  );
}

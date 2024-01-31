"use client";

import { StarIcon } from "@heroicons/react/24/solid";

import Container from "./general/Container";
import Title2 from "./general/Title2";

interface Review {
  title: string;
  name: string;
  comments: string;
  rating: number;
  date: Date;
}
function Review({ title, name, comments, rating, date }: Review) {
  return (
    <div className=" flex min-w-[22rem] flex-col rounded border border-white p-6">
      <div className=" mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className=" size-4 text-amber-400" />
        ))}
      </div>
      <strong className=" text-lg">{title}</strong>

      <div className="relative mb-4 h-24 overflow-hidden">
        <p>{comments}</p>
        <div className=" absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-black to-black/0" />
      </div>
      <div className=" mt-auto flex justify-between font-light">
        <span>{name}</span>
        <span className=" text-white/80">{`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <Container>
      <Title2>reviews</Title2>
      <div className="flex w-full items-stretch gap-8 overflow-auto overflow-auto py-4">
        <Review
          title="Fantastic Experience"
          name="Alex Johnson"
          comments="This was beyond my expectations! The quality and service were top-notch. Highly recommend to anyone looking for excellence."
          rating={5}
          date={new Date()}
        />
        <Review
          title="Absolutely Loved It"
          name="Samantha Lee"
          comments="I'm thoroughly impressed with the level of detail and care put into this. It definitely deserves a five-star rating."
          rating={5}
          date={new Date()}
        />
        <Review
          title="Outstanding Quality"
          name="Michael Brown"
          comments="From start to finish, the experience was flawless. The attention to detail is evident, and I couldn't be happier."
          rating={5}
          date={new Date()}
        />
        <Review
          title="Remarkable Service"
          name="Emma Wilson"
          comments="Everything was perfect! The team went above and beyond to meet my expectations. Truly a remarkable experience. Everything was perfect! The team went above and beyond to meet my expectations. Truly a remarkable experience"
          rating={5}
          date={new Date()}
        />
        <Review
          title="Top Choice!"
          name="David Nguyen"
          comments="This is definitely my go-to now. Excellent quality, fantastic service, and overall a great experience."
          rating={5}
          date={new Date()}
        />
        <Review
          title="Highly Impressive"
          name="Isabella Garcia"
          comments="I'm really impressed with the level of professionalism and quality. It exceeded my expectations in every way."
          rating={5}
          date={new Date()}
        />
      </div>
    </Container>
  );
}

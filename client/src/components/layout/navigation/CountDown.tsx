"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";

export default function CountDown({ date }: { date: Date }) {
  const [countDown, setCountDown] = useState<any>(null);
  useEffect(() => {
    setCountDown(<Countdown date={new Date(date)} />);
  }, []);
  return countDown;
}

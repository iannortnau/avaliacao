import {useEffect} from "react";
import Router from 'next/router'

export default function Home() {
  useEffect(function (){
    Router.push("admin/painel");
  });
  return (
      <></>
  );
}

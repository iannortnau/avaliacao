import {useEffect} from "react";
import Router from 'next/router';
import Image from "next/image";
import logo from '../../public/1 - marca baseAsset 4@4x-100.jpg';

export default function Header() {
    return (
        <>
            <header className="sombra d-flex flex-justify-center w3-padding" style={{width:"100%"}} id="home">
                <Image
                    src={logo}
                    width={50}
                    height={50}
                />
            </header>
        </>
    );
}

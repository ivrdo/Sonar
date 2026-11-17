
import { HttpError } from "wasp/server";  //HttpError za odbijanje prijave i vracanje statusa
import {OnBeforeLoginHook } from "wasp/server/auth"; //tip za provjeru ispravnosti funkcije onBeforeLogin

//izvrsava se prije prijave korisnika
export const onBeforeLogin: OnBeforeLoginHook = async ({
  user,
}) => {
  if(user.status == "AKTIVAN"){  //AKTIVAN moze nastavit dalje
    return;
  }

  switch(user.status){
    case "SUSPENDIRAN":
      throw new HttpError(403, "Vaš račun je privremeno suspendiran. Prijava s ovim računom nije moguća.");
    case "DEAKTIVIRAN":
      throw new HttpError(403, "Vaš račun je deaktiviran. Prijava s ovim računom nije moguća.");
    case "OBRISAN":
      throw new HttpError(403, "Ovaj račun više ne postoji. Prijava s ovim računom nije moguća.");
    default:
      throw new HttpError(403, "Vaš račun nema pravo pristupa."); //sig. provjera: nepoznat status se odbija
  }
};
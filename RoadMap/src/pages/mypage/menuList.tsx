import { ReactElement } from "react";
import ActPage from "./act";
import ProfilePage from "./profile";

const mlist : {
    [key : string] : ReactElement;
}
 = {
    'profile' : <ProfilePage/>, 'act' : <ActPage/>
}
export default mlist;
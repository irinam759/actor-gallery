import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
moment().format();



class ActorCard {
    constructor(fName,lName,bday,imgUrl,imdbLink){
        this.fName = fName;
        this.lName = lName;
        this.bday = moment(bday).format('DD-MM-YYYY');
        this.imgUrl = imgUrl;
        this.imdbLink = imdbLink;
        this.id = uuidv4();
        this.age =  moment().format('YYYY') -  moment(bday).format('YYYY') ;
    }
}

export default ActorCard;
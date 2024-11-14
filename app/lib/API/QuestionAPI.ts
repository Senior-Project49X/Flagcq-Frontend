import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;


export const CreateQuestionAPI=(
    Categories_id:string,
    Title:string,
    Description:string,
    Answer:string,
    Point:number|string,
    DifficultyId:string,
    FilePath:string[],
    Type:string
    )=>{
    axios.post(`${ip}/api/question`,{
        categories_id:Categories_id,
        title:Title,
        Description:Description,
        Answer:Answer,
        point:Point,
        difficultys_id:DifficultyId,
        file_path:FilePath,
        type:Type,
    } ).then((resp) => {
        console.log(resp)
        return resp
    }
    ).catch((e)=>{return(e)})
};
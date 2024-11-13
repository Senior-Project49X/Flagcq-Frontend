import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;


export const CreateQuestionAPI=(
    Categories_id:number,
    Title:string,
    Description:string,
    Answer:string[],
    Point:number,
    DifficultyId:number,
    File_path:string,
    Type:number
    )=>{
    axios.post(`${ip}/api/question`,{
        categories_id:Categories_id,
        title:Title,
        Description:Description,
        Answer:Answer,
        point:Point,
        difficultys_id:DifficultyId,
        file_path:File_path,
        type:Type,
    } ).then((resp) => {
        console.log(resp)
        return resp
    }
    )
};
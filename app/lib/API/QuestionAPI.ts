import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;


export const CreateQuestionAPI=(
    FormData:FormData
    )=>{
    axios.post(`${ip}/api/question`,{
        FormData
    },{withCredentials:true} ).then((resp) => {
        console.log(resp)
        return resp
    }
    ).catch((e)=>{return(e)})
};

export const GetQuestions=async(
    selectedCategory:string,
    selectedDifficulty:string,
    page:string|null)=>{
    const NewPage = page===null? 1:page

    console.log(`${ip}/api/questions/practice${selectedCategory==="All Categories" ? null:`?category=${selectedCategory}`}${selectedDifficulty==="All Difficulty" ? null:`&Difficulty=${selectedDifficulty}`} &page=${NewPage}`)

    axios.get(`${ip}/api/questions/practice${selectedCategory==="All Categories" ? null:`?category=${selectedCategory}`}${selectedDifficulty==="All Difficulty" ? null:`&Difficulty=${selectedDifficulty}`} &page=${NewPage}`)
    .then().catch((e)=>{console.log(e)})
}

export const GetQuestionsByID=async(id:string)=>{
    axios.get(`${ip}/api/question/${id}`)
    .then().catch((e)=>{console.log(e)})
}

export const DeleteQuestionsByID=async(id:string)=>{
    axios.get(`${ip}/api/question/${id}`)
    .then().catch((e)=>{console.log(e)})
}

export const CheckQuestionsByID=async(id:string,Answer:string)=>{
    axios.post(`${ip}/api/question/check-answer`,{Answer:Answer})
    .then().catch((e)=>{console.log(e)})
}

export const DownloadQuestionsByID=async(id:string)=>{
    axios.get(`${ip}/api/question/download/${id}`)
    .then().catch((e)=>{console.log(e)})
}
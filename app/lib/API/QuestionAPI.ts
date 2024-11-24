import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const CreateQuestionAPI = async (CreateData: FormData) => {
  axios
    .post(`${ip}/api/question`, CreateData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // ให้ axios ทราบว่าใช้ FormData
      },
    })
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((e) => {
      return e;
    });
};

export const GetQuestions = async (
  selectedCategory: string,
  selectedDifficulty: string,
  page: string | null
) => {
  const NewPage = page === null ? 1 : page;
try{
    const resp = await axios.get(`${ip}/api/questions/practice?
        ${selectedCategory==="All Categories" ? "":`category=${selectedCategory}`}
        ${selectedDifficulty==="All Difficulty" ? "":`&Difficulty=${selectedDifficulty}&`}
        page=${NewPage}`)
    return resp.data
}catch(e){
    console.error("Error fetching questions:", e);
}
    // console.log(`${ip}/api/questions/practice?${selectedCategory==="All Categories" ? "":`category=${selectedCategory}`}${selectedDifficulty==="All Difficulty" ? "":`&Difficulty=${selectedDifficulty}&`}page=${NewPage}`)

}

export const GetQuestionsByID = async (id: string) => {
try{
  const resp =await axios.get(`${ip}/api/question/${id}`)
  console.log(resp.data)
  return resp.data
}catch(e){
  console.error("Error fetching questions:", e);

}


};

export const DeleteQuestionsByID = async (id: string) => {
  await axios
    .get(`${ip}/api/question/${id}`)
    .then()
    .catch((e) => {
      console.log(e);
    });
};

export const CheckQuestionsByID = async (id: string, Answer: string) => {
  axios
    .post(`${ip}/api/question/check-answer`, { id:id,Answer: Answer },{withCredentials: true,})
    .then((resp)=>{console.log(resp)})
    .catch((e) => {
      console.log(e);
    });
};

export const DownloadQuestionsByID = async (id: string) => {
  await axios
    .get(`${ip}/api/question/download/${id}`)
    .then((resp)=>{console.log(resp)})
    .catch((e) => {
      console.log(e);
    });
};

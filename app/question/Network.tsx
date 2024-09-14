import CardItem from "../component/cardItem";

export default function Network() {
  return (
    <div className="mt-12 grid grid-cols-3 gap-6 px-16">
      <CardItem Topic={"Linux"} Level={"Easy"} />
      <CardItem Topic={"bread"} Level={"Hard"}/>
      <CardItem Topic={"meat"} Level={"Medium"}/> 
      <CardItem Topic={"meat"} Level={"Medium"}/> 
    </div>
  );
}

import Homepage from "./homepage.mdx"

const Home = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <div className="markdown">
        <Homepage />
      </div>
    </div>
  )
}
export default Home
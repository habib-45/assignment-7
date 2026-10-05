import Link from 'next/link';

interface catagoriDataType {
    slug: string,
    title: string,
    topicId: string | null,
    url: string,
    scrapable: boolean
}


const Navber = async () => {

    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    const categoriesData = await res.json()
    const navs:catagoriDataType[] = categoriesData.data
    const filterData = navs.filter(ca => ca.scrapable)
    console.log(navs)
    return (
        <div className='flex gap-4 justify-center mt-5'>
            <Link href={'/'}>হোম</Link>
            {
                filterData.map((ca, ind) => <Link key={ind} href={ca.slug}>{ca.title}</Link>)
            }
        </div>
    );
};

export default Navber;
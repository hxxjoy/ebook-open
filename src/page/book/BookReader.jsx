import React, { useState, useEffect, useCallback } from 'react';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { FaBars, FaBookmark, FaShareAlt, FaTimes, FaList, FaAngleDoubleLeft } from 'react-icons/fa';
import { bookApi } from '../../service/api';
import PrevNextButtons from '../../component/common/PrevNextButtons';

const BookReader = () => {
  const { id, chapterId: initialChapterId } = useParams();
  const [book, setBook] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentChapterId, setCurrentChapterId] = useState(initialChapterId);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [slugs, setSlugs] = useState([])
  const [isLast,setIsLast] = useState(false)
  const [isFirst, setIsFirst] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /*const fetchChapterContent = async (chapterId) => {
    setLoading(true);
    try {
      const chapter = await bookApi.getChapter(chapterId);
      setChapterContent(chapter.data);
      setCurrentChapterId(chapterId);
      if (isMobile) {
        setShowSidebar(false);
      }
    } catch (error) {
      console.error('Error fetching chapter content:', error);
    } finally {
      setLoading(false);
    }
  };*/

  const fetchChapterContent = useCallback(async (chapterId) => {
    setLoading(true);
    try {
      const chapter = await bookApi.getChapter(chapterId);
      setChapterContent(chapter.data);
      setCurrentChapterId(chapterId);
      window.scrollTo(0, 0)
      
    } catch (error) {
      console.error('Error fetching chapter content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false)
    }
    const loadData = async () => {
      try {
        const data = await bookApi.getChapters(id);
        setChapters(data.data.chapters);
        setBook(data.data.book);
        const targetChapterId = initialChapterId || data.data.chapters[0].slug;
        fetchChapterContent(targetChapterId);
        let slugArray = []
        for (let i of data.data.chapters) {
          slugArray.push(i.slug)
        }
        setSlugs(slugArray)
        if(slugArray.indexOf(targetChapterId) === 0) {
          setIsFirst(true)
        } else {
          setIsFirst(false)
        }
        if(slugArray.indexOf(targetChapterId) === slugArray.length-1) {
          setIsLast(true)
        } else {
          setIsLast(false)
        }
      } catch (error) {
        console.error('Failed to load book:', error);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, initialChapterId,fetchChapterContent, isMobile]);

  const navigate = useNavigate()
  const toChapter = (slug) => {
    navigate(`/book/read/${id}/${slug}`)
  }

  const setPage = (slug,act) => {
    let index = slugs.indexOf(slug)
    if(act === 1 && index < slugs.length-1) {
      toChapter(slugs[index+1])
    }
    if(act === -1 && index > 0) {
      toChapter(slugs[index-1])
    }
  }

  if (!book) return <div>Loading...</div>;

  const renderPhoneSidebar = () => 
    (
    <div className="fixed inset-0 z-50 bg-white transition-all duration-300">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-normal">{book.title}</h1>
        <button onClick={() => { setShowSidebar(false) } }>
          <FaTimes className="text-2xl" />
        </button>
      </div>
      <div className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto pt-5">
        {chapters.map((chapter) => (
          <button
            key={chapter.slug}
            //onClick={() => fetchChapterContent(chapter.slug)}
            onClick={() => toChapter(chapter.slug)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              currentChapterId === chapter.slug ? 'bg-gray-100' : ''
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </div>
      <PrevNextButtons customStyle={" pl-5 mt-2"} onPrev={()=>setPage( currentChapterId,-1)} onNext={()=>setPage( currentChapterId,1)} prevDisabled={isFirst} nextDisabled={isLast} />
      <div className="w-full absolute bottom-0 pt-5 flex justify-center" onClick={() => { setShowSidebar(false) } }><FaAngleDoubleLeft className="text-2xl" /></div>
    </div>
  );

  const renderSidebar = () => 
    (
    <div className="w-[300px] h-[calc(100vh-56px)] border-r overflow-y-auto fixed transition-all duration-300">
      <div className="pl-5">
        <PrevNextButtons onPrev={()=>setPage( currentChapterId,-1)} onNext={()=>setPage( currentChapterId,1)} prevDisabled={isFirst} nextDisabled={isLast} />
        <Link to={`/book/${book.slug}`} ><h1 className="text-lg font-medium mt-4 mb-4">{book.title}</h1></Link>
      </div>
      <div className="space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
        {chapters.map((chapter) => (
          <button
            key={chapter.slug}
            //onClick={() => fetchChapterContent(chapter.slug)}
            onClick={() => toChapter(chapter.slug)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
              currentChapterId === chapter.slug ? 'bg-gray-100' : ''
            }`}
          >
            {chapter.title}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto md:p-6 flex-col min-h-screen">
      <div className={`${isMobile ? 'block' : 'flex'}`}>
        {(isMobile && showSidebar) ? renderPhoneSidebar() : ""}
        {(!isMobile && showSidebar) ? renderSidebar() : ""}

        {/* 内容区域 */}
        <div className={`
          ${isMobile ? 'w-full' : 'flex-1'} 
          relative
          ${!isMobile && showSidebar ? 'ml-[300px]' : ''}
        `}>
          {!isMobile && (
            <button 
              onClick={() => { setShowSidebar(!showSidebar) }}
              className="absolute left-4 p-4 hover:bg-gray-100 rounded-lg"
            >
              <span className="text-xl"><FaList /></span>
            </button>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-full">
              Loading...
            </div>
          ) : chapterContent ? (
            <div className="max-w-5xl mx-auto md:pl-8">
              <h2 className="text-center text-xl md:text-2xl font-light mb-4">
                {chapterContent.title}
              </h2>
              <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 space-x-4 md:space-x-4 mb-4">
                <span>Author: {book.author}</span>
                <span className="ml-5">View: {chapterContent.view_count}</span>
                <button className="text-blue-500 flex items-center gap-1 ml-5">
                  <FaBookmark /> Bookmark
                </button>
                <button className="text-blue-500 flex items-center gap-1 ml-5">
                  <FaShareAlt /> Share
                </button>
              </div>

              <div className="prose max-w-none mt-10 md:mt-8">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: chapterContent.content 
                  }} 
                  className="text-base leading-7 tracking-wide"
                />
              </div>
              <PrevNextButtons customStyle={" mb-20"} onPrev={()=>setPage( currentChapterId,-1)} onNext={()=>setPage( currentChapterId,1)} prevDisabled={isFirst} nextDisabled={isLast} />
            </div>
            
          ) : (
            <div className="flex justify-center items-center h-full mt-20">
              No Data
            </div>
          )}
        </div>

        {/* 移动端的目录切换按钮 */}
        {isMobile && (
          <button 
            onClick={() => setShowSidebar(true)} 
            className="fixed right-4 bottom-4 w-12 h-12 bg-white border rounded-full shadow-lg flex items-center justify-center z-40"
          >
            <FaBars />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookReader;
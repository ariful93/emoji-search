import './App.css';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LoadingItem from './components/LoadingItem';

function App() {
  const emojiPerItem = 200
  const [emojis, setEmojis] = useState();
  const [copyEmoji, setCopyEmoji] = useState();
  const [searchItem, changeSearchEmoji] = useState("")
  const [searchEmoji, setSearchEmoji] = useState();
  const [loadmore, setLoadmore] = useState(emojiPerItem);

  const handleCopyEmoji = () => {
    setCopyEmoji(true);
    setTimeout(() => {
      setCopyEmoji(false);
    }, 1000);
  };

  const loadMore = () => {
    setLoadmore(loadmore + emojiPerItem)
  }

  
  useEffect(() => {
    fetch("https://emoji-api.com/emojis?access_key=fe6959ba02bb4da381426a7a34d920ec47e2296c")
    .then(response => response.json())
    .then( (data) => setEmojis(data) )
  },[emojis])

  useEffect(() => {
    fetch(`https://emoji-api.com/emojis?search=${searchItem}&access_key=fe6959ba02bb4da381426a7a34d920ec47e2296c`)
    .then( response => response.json() )
    .then( data => setSearchEmoji(data) )
  },[searchItem])


  return (
    <div className="App">

      <ul className='emoji-wrapper'>
        <div className='emoji-header-wrap'>
          <h3>All Emoji</h3>
          <div className='search-field'>
                <input 
                  type='search' 
                  placeholder='Search'
                  autoFocus
                  aria-label='Search Emoji'
                  onChange={e => changeSearchEmoji(e.target.value)}
                  value={searchItem}
                />
          </div>
        </div>
        
        {
          searchItem?.length > 0 ?
            <>
              <span className={`copy-emoji ${copyEmoji ? "active" : ""}`}> Copied!</span>
              {
                searchEmoji?.length > 0 ? 
                <>
                  {
                    searchEmoji !== null ? 
                    searchEmoji && searchEmoji.map( ( searchItem, index ) => {
                        return(
                          <li key={index} className='emoji-item' title={ searchItem.unicodeName }>
                            <input
                              type="hidden"
                              value={ searchItem.character }
                              readOnly
                            />
                            <CopyToClipboard
                              text={searchItem.character}
                              onCopy={ handleCopyEmoji }
                            >
                              <div>{ searchItem.character }</div>
                            </CopyToClipboard>
                          </li>
                        )
                      })
                    : 
                      <h3>No Results</h3>
                  }
                </>
                :
                <LoadingItem />
              }
              
            </>
          : 
            <>
              <span className={`copy-emoji ${copyEmoji ? "active" : ""}`}> Copied!</span>
              {
                emojis?.length > 0 ? 
                <>
                  {
                    emojis && emojis.slice(0, loadmore).map( ( emoji, index ) => {
                      return(
                        <li key={index} className='emoji-item' title={ emoji.unicodeName }>
                          <input
                            type="hidden"
                            value={ emoji.character }
                            readOnly
                          />
                          <CopyToClipboard
                            text={emoji.character}
                            onCopy={ handleCopyEmoji }
                          >
                            <div>{ emoji.character }</div>
                          </CopyToClipboard>
                        </li>
                      )
                    })
                  }
                  {
                    loadmore < emojis?.length && (
                      <h4 className='loadmore' onClick={loadMore}>Load More</h4>
                    )
                  }
                </>
                :
                <LoadingItem />
              }
              
              
            </>
        }
       
        
      </ul>

    </div>
  );
}

export default App;

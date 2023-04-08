import './Dictionary.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

import { GlobalContext } from '../context/GlobalState';
import useLocalStorage from '../hooks/useLocalStorage';
import DictionaryItem from '../components/DictionaryItem';
import Spinner from '../components/Spinner'
import './Dictionary.css'

const HeaderText = styled.h2`
text-align: center; 
padding-block: 10px;
`;

const InnerContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
gap: 15px;
padding-block: 10px;
`

const WordText = styled.h2` 
text-transform: uppercase;
`;

const TextContainer = styled.div`
text-align: justify;
`

const Button = styled.button`
padding: 7px 20px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
cursor: pointer;

`;
const VolumeButton = styled.button`
padding: 10px;
width: 50px;
height: 50px;
box-shadow: 1px 1px 7px #000;
border-radius: 50%;
cursor: pointer;
font-size: 1rem;
`;

const HeaderButton = styled.button`
padding: 8px 40px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
cursor: pointer;
font-size: 1rem;
margin-inline: auto;
font-size: .8rem;
margin-top: 20px;
margin-bottom: 10px;
position: relative;

@media (min-width: 376px) {
  font-size: 1rem;
}
`;

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  padding: 7px 10px;
  box-shadow: 1px 1px 7px #000;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  color: #fff;
  font-size: .7rem;
`;

const CardsDiv = styled.div`
display: flex;
align-items: center;
gap: 10px; 
flex-wrap: wrap
`

const Block = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: strech;
gap: 30px;
`

const Input = styled.input`
width: 100%;
`






const Dictionary = () => {

    //Background
    const { getPeriod, currentHour } = useContext(GlobalContext)

    //Dictionary
    const audioRef = useRef()
    const blockRef = useRef()

    const [inputOne, setInputOne] = useState("")
    const [fetchedData, setFetchedData] = useState("")
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [antonyms, setAntonyms] = useState([])
    const [synonyms, setSynonyms] = useState([])
    const [partOfSpeech, setPartOfSpeech] = useState("")
    const [phonetic, setPhonetic] = useState("")
    const [src, setSrc] = useState("")
    const [inputTwo, setInputTwo] = useState("")
    const [dictionaryList, setDictionaryList] = useLocalStorage("dictionaryList", [])

    const [isFetchedData, setIsFetchedData] = useState(false)
    const [isAntonyms, setIsAntonyms] = useState(false)
    const [isSynonyms, setIsSynonyms] = useState(false)
    const [isSavedData, setIsSavedData] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isSrc, setIsSrc] = useState(true)
    const [isNewFocus, setIsNewFocus] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    //Background
    useEffect(() => {
        getPeriod()
    }, [currentHour]) //period ?
    //getPeriod()

    //Dictionary

    //check for conditional rendering
    useEffect(() => {
        if (antonyms.length > 0) {
            setIsAntonyms(true);
        }
        if (antonyms.length <= 0) {
            setIsAntonyms(false);
        }
    }, [antonyms]);

    useEffect(() => {
        if (synonyms.length > 0) {
            setIsSynonyms(true);
        }
        if (synonyms.length <= 0) {
            setIsSynonyms(false);
        }

    }, [synonyms]);

    useEffect(() => {
        if (fetchedData.length > 0) {
            setIsFetchedData(true);
            setIsLoading(false)
        }
        if (fetchedData.length <= 0) {
            setIsFetchedData(false);

        }
    }, [fetchedData])

    useEffect(() => {
        if (dictionaryList.length > 0) {
            setIsSavedData(true);
        }
        if (dictionaryList.length <= 0) {
            setIsSavedData(false);
        }
    }, [isOpen, dictionaryList])



    //search functions
    const searchInputOne = () => {
        console.log(inputOne)
        fetchInputOne()
    }
    const searchInputOneWithEnter = (e) => {
        if (e.keyCode == "13") {
            console.log(inputOne)
            fetchInputOne()
        }
    }

    const fetchInputOne = () => {
        setIsLoading(true)
        setIsSrc(true)
        setIsAntonyms(false)
        setIsSynonyms(false)
        setIsOpen(false)
        setIsFetchedData(false)
        if (inputOne !== "") {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputOne}`)
                .then(response => response.json())
                .then((data) => {
                    setFetchedData(data)
                    setWord(data[0].word)
                    setDefinition(data[0].meanings[0].definitions[0].definition)
                    setPartOfSpeech(data[0].meanings[0].partOfSpeech)
                    setPhonetic(data[0].phonetic)
                    setAntonyms(data[0].meanings[0].antonyms)
                    setSynonyms(data[0].meanings[0].synonyms)
                    setSrc(data[0].phonetics[((data[0].phonetics).length) - 1].audio)
                })
                //.then(console.log(fetchedData))
                .catch(err => console.log(err))

            setInputOne("")

        } else {
            setFetchedData([])
        }
    }

    //save functions
    const saveInputTwo = () => {
        console.log(inputTwo)
        saveWord()
    }

    const saveInputTwoWithEnter = (e) => {
        if (e.keyCode == "13") {
            console.log(inputTwo)
            saveWord()
        }
    }

    const saveWord = () => {

        setDictionaryList([...dictionaryList, {
            word: word,
            definition: definition,
            src: src,
            translation: inputTwo,
            id: Math.floor(Math.random() * 10000)
        }])

        setInputTwo("")
        setIsOpen(true)
        setIsFetchedData(false)

    }

    //remove
    /*const removeItem = (id) => {
        dictionaryList.forEach((item, index) => {
            if (item.id === +id) {
                dictionaryList.splice(index, 1)
            }
        });

        console.log(dictionaryList)
        setIsOpen(false)
        setTimeout(() => {
            setIsOpen(true)
        }, 20)

        localStorage.setItem("dictionaryList", JSON.stringify(dictionaryList));
    }*/

    const removeItem = (id) => {
        setDictionaryList(prevDictionaryList => {
            return prevDictionaryList.filter(item => item.id !== +id)
        })

        localStorage.setItem("dictionaryList", JSON.stringify(dictionaryList));
    }

    //play
    const playAudio = () => {
        if (src !== "") {
            audioRef.current.play()
            setIsSrc(true)
        } else {
            setIsSrc(false)
        }
    }







    //return value
    return (
        <div className='container dictionary fade-in-container'>
            <div className="block-container">
                <audio ref={audioRef} src={src} id="sound"></audio>
                <HeaderText>Angol Szótár</HeaderText>
                <Block>


                    <div className='flex-container'>
                        <Input style={{ width: '100%' }} type="text" placeholder="Keresett szó.." value={inputOne}
                            onChange={(e) => setInputOne(e.target.value)}
                            onKeyUp={searchInputOneWithEnter}
                        />
                        <Button id="search-btn" onClick={searchInputOne}>Keresés</Button>
                    </div>


                    {
                        isLoading && 
                        <>
                            <Spinner/>
                        </>
                    }


                    {
                        isFetchedData &&
                        < div className="fade-in-container">
                            <InnerContainer >
                                <div className='flex-container'>
                                    <WordText>{word}</WordText>
                                    <VolumeButton onClick={playAudio}>{!isSrc ? <i class="fa-solid fa-microphone-slash"></i> : <i className="fa-solid fa-volume-high"></i>}</VolumeButton>
                                </div>
                                <div >
                                    <p>{partOfSpeech}</p>
                                    <p>{phonetic}</p>
                                </div>
                                <TextContainer>{definition}</TextContainer>

                                {isAntonyms &&
                                    <p>Ellentétek:</p>
                                }

                                <CardsDiv >
                                    {antonyms.map((a, idx) => (
                                        <Button key={idx}>{a}</Button>
                                    ))}
                                </CardsDiv>



                                {isSynonyms &&
                                    <p>Szinonímák:</p>
                                }

                                <CardsDiv >
                                    {synonyms.map((s, idx) => (
                                        <Button key={idx}>{s}</Button>
                                    ))}
                                </CardsDiv>


                            </InnerContainer>

                            <div className='flex-container'>
                                <input type="text" placeholder="Fordítás.." value={inputTwo} onChange={(e) => setInputTwo(e.target.value)} onKeyUp={saveInputTwoWithEnter} />
                                <Button onClick={saveInputTwo}>Mentés</Button>
                            </div >
                        </div>

                    }

                    <InnerContainer>
                        {
                            isSavedData &&
                            <>
                                <HeaderButton onClick={() => setIsOpen(!isOpen)}>
                                    {isOpen ? "Szótár" : "Mentett szavak"} <CloseButton ><i className={isOpen ? "fa-solid fa-folder-closed" : "fa-solid fa-folder-open"}></i></CloseButton>
                                </HeaderButton>

                            </>
                        }
                        {
                            isOpen &&

                            <Block ref={blockRef} className="fade-in-container">

                                {dictionaryList.map((item, idx) => (
                                    <DictionaryItem
                                        key={idx}
                                        word={item.word}
                                        definition={item.definition}
                                        src={item.src}
                                        translation={item.translation}
                                        id={item.id}
                                        removeItem={removeItem}

                                    />
                                ))}

                            </Block>
                        }


                    </InnerContainer>


                </Block>
            </div>




        </div>

    )
}

export default Dictionary


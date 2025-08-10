import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { Ollama } from 'ollama';
import { cardMeanings } from './card-meanings.ts';

// Initialize the Ollama client
const ollama = new Ollama();

const TarotApp = () => {
  const [question, setQuestion] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState('random');
  const [chat, setChat] = useState<boolean>(false);

  useEffect(() => {
    startNewSession();
  }, []);

  // --- PIXEL ART COMPONENTS ---

  // Minor Arcana Suits
  const PixelCup = () => (
    <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">
      {[
        'T', 'bg-blue-300', 'bg-blue-200', 'bg-blue-300', 'T',
        'T', 'bg-blue-400', 'bg-blue-300', 'bg-blue-400', 'T',
        'T', 'T', 'bg-blue-400', 'T', 'T',
        'T', 'T', 'bg-yellow-500', 'T', 'T',
        'T', 'T', 'bg-yellow-500', 'T', 'T',
        'T', 'bg-yellow-600', 'bg-yellow-500', 'bg-yellow-600', 'T',
        'bg-yellow-600', 'bg-yellow-600', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-600',
      ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent' : c} w-2 h-2`}></div>)}</div></div>
  );
  const PixelWand = () => (
    <div className="inline-block"><div className="grid grid-cols-3 gap-px w-6 h-10">
      {[
        'T', 'bg-green-400', 'T',
        'bg-green-500', 'bg-red-500', 'bg-green-500',
        'T', 'bg-red-500', 'T',
        'T', 'bg-yellow-700', 'T',
        'T', 'bg-yellow-700', 'T',
        'T', 'bg-yellow-800', 'T',
        'T', 'bg-yellow-800', 'T',
        'T', 'bg-yellow-900', 'T',
      ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent' : c} w-2 h-2`}></div>)}</div></div>
  );
  const PixelSword = () => (
      <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">
          {[
              'T','T','bg-gray-300','T','T',
              'T','T','bg-gray-300','T','T',
              'T','T','bg-gray-200','T','T',
              'T','T','bg-gray-200','T','T',
              'T','T','bg-gray-200','T','T',
              'bg-yellow-500','bg-yellow-500','bg-blue-600','bg-yellow-500','bg-yellow-500',
              'T','T','bg-blue-600','T','T',
              'T','T','bg-blue-600','T','T',
          ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>
  );
  const PixelPentacle = () => (
      <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">
          {[
              'T','T','bg-yellow-400','T','T',
              'T','bg-yellow-400','T','bg-yellow-400','T',
              'bg-yellow-400','bg-yellow-400','bg-yellow-400','bg-yellow-400','bg-yellow-400',
              'bg-yellow-400','T','T','T','bg-yellow-400',
              'bg-yellow-400','T','T','T','bg-yellow-400'
          ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent' : c} w-2 h-2`}></div>)}</div></div>
  );
  const PixelGenericStar = () => (
    <div className="inline-block"><div className="grid grid-cols-3 gap-px w-6 h-6">{['bg-transparent', 'bg-purple-400', 'bg-transparent','bg-purple-400', 'bg-purple-200', 'bg-purple-400','bg-transparent', 'bg-purple-400', 'bg-transparent'].map((c,i) => <div key={i} className={`${c} w-2 h-2`}></div>)}</div></div>
  );

  // Major Arcana Cards
  const PixelTheFool = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{[
    'bg-yellow-300','bg-yellow-300','T','T','T',
    'bg-yellow-300','T','T','bg-amber-800','T',
    'T','T','bg-rose-200','bg-amber-800','T',
    'T','T','bg-blue-500','T','T',
    'T','T','bg-blue-500','T','T',
    'T','T','bg-amber-900','bg-amber-900','T',
    'T','T','T','T','T',
    'bg-green-600','bg-green-600','bg-green-600','bg-green-600','bg-red-700',
  ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheMagician = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['T','bg-white','bg-white','T','T','bg-red-500','bg-red-500','T','bg-red-500','bg-red-500','bg-red-500','bg-red-500','T','bg-red-500','bg-red-500','T','bg-yellow-600','bg-yellow-600','bg-yellow-600','bg-yellow-600','T','bg-red-500','bg-red-500','T','T','bg-red-500','bg-red-500','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheHighPriestess = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{[
    'bg-black','T','T','T','bg-white',
    'bg-black','T','bg-gray-200','T','bg-white',
    'bg-black','bg-blue-300','bg-blue-300','bg-blue-300','bg-white',
    'bg-black','bg-blue-400','bg-blue-400','bg-blue-400','bg-white',
    'bg-black','bg-blue-400','bg-blue-400','bg-blue-400','bg-white',
    'bg-black','T','bg-yellow-300','T','bg-white',
    'bg-black','bg-black','bg-black','bg-white','bg-white',
  ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheEmpress = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{[
    'T','T','bg-yellow-300','T','T',
    'T','bg-rose-200','bg-rose-200','bg-rose-200','T',
    'T','bg-yellow-600','bg-rose-300','bg-yellow-600','T',
    'bg-green-500','bg-rose-400','bg-rose-400','bg-rose-400','bg-green-500',
    'bg-green-500','bg-rose-400','bg-rose-400','bg-rose-400','bg-green-500',
    'bg-yellow-500','bg-green-600','bg-green-600','bg-green-600','bg-yellow-500',
    'bg-yellow-500','bg-yellow-500','bg-green-600','bg-yellow-500','bg-yellow-500',
  ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheEmperor = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{[
    'bg-gray-700','T','bg-yellow-400','T','bg-gray-700',
    'bg-gray-700','bg-rose-200','bg-rose-200','bg-rose-200','bg-gray-700',
    'bg-gray-600','T','bg-red-600','T','bg-gray-600',
    'bg-gray-600','bg-red-600','bg-red-600','bg-red-600','bg-gray-600',
    'bg-gray-600','bg-red-600','T','bg-red-600','bg-gray-600',
    'bg-gray-700','bg-red-700','T','bg-red-700','bg-gray-700',
    'bg-gray-700','bg-gray-700','T','bg-gray-700','bg-gray-700',
  ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheHierophant = () => <div className="inline-block"><div className="grid grid-cols-3 gap-px w-6 h-10">{['T','bg-yellow-400','T','bg-yellow-400','bg-yellow-400','bg-yellow-400','T','bg-yellow-400','T','T','bg-red-600','T','T','bg-red-600','T','T','bg-red-600','T','T','bg-red-600','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheLovers = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-8">{['T','bg-red-500','T','bg-blue-500','T','bg-red-500','bg-red-500','T','bg-blue-500','bg-blue-500','T','bg-red-500','T','bg-blue-500','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheChariot = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['T','T','bg-yellow-400','T','T','T','bg-gray-400','bg-gray-400','bg-gray-400','T','bg-gray-400','bg-gray-400','bg-gray-400','bg-gray-400','bg-gray-400','bg-black','bg-gray-400','T','bg-gray-400','bg-white','bg-black','bg-black','T','bg-white','bg-white'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelStrength = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['T','bg-white','bg-white','T','T','bg-white','bg-white','T','bg-yellow-600','bg-yellow-600','bg-yellow-600','T','bg-yellow-600','T','bg-yellow-600','T','bg-yellow-600','bg-yellow-600','bg-yellow-600','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheHermit = () => <div className="inline-block"><div className="grid grid-cols-3 gap-px w-6 h-10">{['T','bg-gray-400','T','T','bg-gray-400','T','T','bg-gray-400','T','bg-gray-400','bg-yellow-300','bg-gray-400','T','bg-gray-400','T','T','bg-gray-400','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelWheelOfFortune = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['T','bg-yellow-500','bg-yellow-500','bg-yellow-500','T','bg-yellow-500','T','bg-blue-500','T','bg-yellow-500','bg-yellow-500','bg-blue-500','bg-blue-500','bg-blue-500','bg-yellow-500','bg-yellow-500','T','bg-blue-500','T','bg-yellow-500','T','bg-yellow-500','bg-yellow-500','bg-yellow-500','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelJustice = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['bg-yellow-400','T','bg-purple-500','T','bg-yellow-400','bg-yellow-400','T','bg-purple-500','T','bg-yellow-400','bg-yellow-400','bg-yellow-400','bg-purple-500','bg-yellow-400','bg-yellow-400','T','T','bg-purple-500','T','T','T','T','bg-purple-500','T','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheHangedMan = () => <div className="inline-block"><div className="grid grid-cols-3 gap-px w-6 h-10">{['T','bg-green-500','T','T','bg-green-500','T','bg-yellow-300','bg-green-500','T','bg-blue-500','bg-blue-500','bg-blue-500','T','bg-blue-500','T','bg-blue-500','T','bg-blue-500'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelDeath = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['T','bg-white','bg-white','T','bg-white','bg-black','bg-black','bg-white','bg-white','bg-white','bg-white','bg-white','T','bg-white','bg-white','T','T','bg-white','bg-white','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTemperance = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['T','bg-blue-400','T','bg-red-400','T','bg-blue-400','bg-blue-200','T','bg-red-200','bg-red-400','T','bg-blue-200','bg-blue-400','bg-red-400','T','T','bg-blue-400','T','bg-red-400','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheDevil = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['bg-red-600','T','T','bg-red-600','T','bg-red-600','bg-red-600','T','T','bg-red-600','bg-red-600','T','bg-black','bg-red-600','bg-red-600','bg-black','T','bg-red-600','bg-red-600','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheTower = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['T','bg-yellow-400','T','T','bg-gray-600','bg-yellow-400','bg-yellow-400','T','bg-gray-600','bg-gray-600','T','T','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600','bg-gray-600'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheStar = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['T','T','bg-yellow-300','T','T','T','bg-yellow-300','bg-yellow-300','bg-yellow-300','T','bg-yellow-300','bg-yellow-300','bg-yellow-300','bg-yellow-300','bg-yellow-300','T','bg-yellow-300','bg-yellow-300','bg-yellow-300','T','T','T','bg-yellow-300','T','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheMoon = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['T','T','bg-gray-200','T','T','T','bg-gray-200','bg-gray-200','bg-gray-200','T','bg-gray-200','bg-gray-300','bg-gray-400','bg-gray-300','bg-gray-200','T','bg-gray-200','bg-gray-200','bg-gray-200','T','T','T','bg-gray-200','T','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheSun = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{['bg-yellow-400','T','bg-yellow-400','T','bg-yellow-400','T','bg-yellow-400','bg-yellow-400','bg-yellow-400','T','bg-yellow-400','bg-yellow-400','bg-yellow-400','bg-yellow-400','bg-yellow-400','T','bg-yellow-400','bg-yellow-400','bg-yellow-400','T','bg-yellow-400','T','bg-yellow-400','T','bg-yellow-400'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelJudgement = () => <div className="inline-block"><div className="grid grid-cols-4 gap-px w-8 h-10">{['bg-yellow-400','T','T','T','T','bg-yellow-400','T','T','T','T','bg-yellow-400','T','bg-gray-300','bg-gray-300','bg-gray-300','bg-gray-300','T','bg-gray-300','bg-gray-300','T'].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  const PixelTheWorld = () => <div className="inline-block"><div className="grid grid-cols-5 gap-px w-10 h-10">{[
    'T','bg-green-500','bg-green-500','bg-green-500','T',
    'bg-green-500','bg-blue-400','bg-blue-400','bg-blue-400','bg-green-500',
    'bg-green-500','bg-blue-400','bg-blue-500','bg-blue-400','bg-green-500',
    'bg-green-500','bg-blue-400','bg-blue-400','bg-blue-400','bg-green-500',
    'T','bg-green-500','bg-green-500','bg-green-500','T'
  ].map((c, i) => <div key={i} className={`${c === 'T' ? 'bg-transparent':c} w-2 h-2`}></div>)}</div></div>;
  
  // --- HELPER FUNCTIONS ---

  const getSuitIcon = (suit) => {
    switch (suit) {
      case 'Cups': return <PixelCup />;
      case 'Wands': return <PixelWand />;
      case 'Swords': return <PixelSword />;
      case 'Pentacles': return <PixelPentacle />;
      default: return <PixelGenericStar />;
    }
  };

  const getMajorArcanaIcon = (cardName) => {
    switch (cardName) {
        case "The Fool": return <PixelTheFool />;
        case "The Magician": return <PixelTheMagician />;
        case "The High Priestess": return <PixelTheHighPriestess />;
        case "The Empress": return <PixelTheEmpress />;
        case "The Emperor": return <PixelTheEmperor />;
        case "The Hierophant": return <PixelTheHierophant />;
        case "The Lovers": return <PixelTheLovers />;
        case "The Chariot": return <PixelTheChariot />;
        case "Strength": return <PixelStrength />;
        case "The Hermit": return <PixelTheHermit />;
        case "Wheel of Fortune": return <PixelWheelOfFortune />;
        case "Justice": return <PixelJustice />;
        case "The Hanged Man": return <PixelTheHangedMan />;
        case "Death": return <PixelDeath />;
        case "Temperance": return <PixelTemperance />;
        case "The Devil": return <PixelTheDevil />;
        case "The Tower": return <PixelTheTower />;
        case "The Star": return <PixelTheStar />;
        case "The Moon": return <PixelTheMoon />;
        case "The Sun": return <PixelTheSun />;
        case "Judgement": return <PixelJudgement />;
        case "The World": return <PixelTheWorld />;
        default: return <PixelGenericStar />;
    }
  };

  // --- TAROT DECK DATA ---
  
  const majorArcanaData = [
    { id: 0, name: "The Fool", type: "Major Arcana" as const, suit: null }, { id: 1, name: "The Magician", type: "Major Arcana" as const, suit: null }, { id: 2, name: "The High Priestess", type: "Major Arcana" as const, suit: null }, { id: 3, name: "The Empress", type: "Major Arcana" as const, suit: null }, { id: 4, name: "The Emperor", type: "Major Arcana" as const, suit: null }, { id: 5, name: "The Hierophant", type: "Major Arcana" as const, suit: null }, { id: 6, name: "The Lovers", type: "Major Arcana" as const, suit: null }, { id: 7, name: "The Chariot", type: "Major Arcana" as const, suit: null }, { id: 8, name: "Strength", type: "Major Arcana" as const, suit: null }, { id: 9, name: "The Hermit", type: "Major Arcana" as const, suit: null }, { id: 10, name: "Wheel of Fortune", type: "Major Arcana" as const, suit: null }, { id: 11, name: "Justice", type: "Major Arcana" as const, suit: null }, { id: 12, name: "The Hanged Man", type: "Major Arcana" as const, suit: null }, { id: 13, name: "Death", type: "Major Arcana" as const, suit: null }, { id: 14, name: "Temperance", type: "Major Arcana" as const, suit: null }, { id: 15, name: "The Devil", type: "Major Arcana" as const, suit: null }, { id: 16, name: "The Tower", type: "Major Arcana" as const, suit: null }, { id: 17, name: "The Star", type: "Major Arcana" as const, suit: null }, { id: 18, name: "The Moon", type: "Major Arcana" as const, suit: null }, { id: 19, name: "The Sun", type: "Major Arcana" as const, suit: null }, { id: 20, name: "Judgement", type: "Major Arcana" as const, suit: null }, { id: 21, name: "The World", type: "Major Arcana" as const, suit: null },
  ];

  const tarotDeck = [
    ...majorArcanaData,
    ...Array.from({ length: 14 }, (_, i) => ({ id: 22 + i, name: i === 0 ? "Ace of Cups" : i < 10 ? `${i + 1} of Cups` : i === 10 ? "Page of Cups" : i === 11 ? "Knight of Cups" : i === 12 ? "Queen of Cups" : "King of Cups", type: "Minor Arcana", suit: "Cups" })),
    ...Array.from({ length: 14 }, (_, i) => ({ id: 36 + i, name: i === 0 ? "Ace of Wands" : i < 10 ? `${i + 1} of Wands` : i === 10 ? "Page of Wands" : i === 11 ? "Knight of Wands" : i === 12 ? "Queen of Wands" : "King of Wands", type: "Minor Arcana", suit: "Wands" })),
    ...Array.from({ length: 14 }, (_, i) => ({ id: 50 + i, name: i === 0 ? "Ace of Swords" : i < 10 ? `${i + 1} of Swords` : i === 10 ? "Page of Swords" : i === 11 ? "Knight of Swords" : i === 12 ? "Queen of Swords" : "King of Swords", type: "Minor Arcana", suit: "Swords" })),
    ...Array.from({ length: 14 }, (_, i) => ({ id: 64 + i, name: i === 0 ? "Ace of Pentacles" : i < 10 ? `${i + 1} of Pentacles` : i === 10 ? "Page of Pentacles" : i === 11 ? "Knight of Pentacles" : i === 12 ? "Queen of Pentacles" : "King of Pentacles", type: "Minor Arcana", suit: "Pentacles" }))
  ];

  const getSuitColor = (suit) => {
    switch (suit) {
      case 'Cups': return 'text-blue-400';
      case 'Wands': return 'text-red-500';
      case 'Swords': return 'text-gray-400';
      case 'Pentacles': return 'text-yellow-500';
      default: return 'text-purple-300';
    }
  };

  const drawRandomCards = () => {
    if (!question.trim()) {
      alert('Please enter your question first.');
      return;
    }
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, 3).map(card => ({ ...card, reversed: Math.random() < 0.5 }));
    setSelectedCards(drawn);
  };

  const clearCurrentCards = () => setSelectedCards([]);

  const handleToggleChange = () => {
    setSelectionMode(prev => {
      const newMode = prev === 'random' ? 'manual' : 'random';
      if (selectedCards.length > 0) clearCurrentCards();
      return newMode;
    });
  };

  const toggleCardSelection = (card) => {
    if (selectionMode === 'random') return;
    if (selectedCards.find(c => c.id === card.id)) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, { ...card, reversed: false }]);
    }
  };

  const toggleCardOrientation = (cardId) => {
    setSelectedCards(selectedCards.map(card => card.id === cardId ? { ...card, reversed: !card.reversed } : card));
  };

  const getInterpretation = async () => {
    if (!question.trim() || selectedCards.length !== 3) {
      alert('Please enter a question and select 3 cards.');
      return;
    }
    if (!chat) {
      alert('Chat session not initialized. Please try starting a new session.');
      return;
    }

    setIsLoading(true);
    try {
      const system_prompt = `You are an experienced and mystical tarot reader named Mystica. You always refer to the user as \"Seeker\".
Your task is to provide a tarot reading based on three cards drawn for a specific question.
Your response MUST be structured using markdown in the following specific way, and only this way:

1.  **Overall Interpretation:** Create a single markdown heading titled '### Answering Your Question'. Under this heading, provide 2 long cohesive paragraphs that weaves the meanings of the three cards together to directly answer the Seeker's question.

2.  **Mystica's Advice:** Create a single markdown heading titled '### Mystica's Advice'. Under this heading, provide exactly three distinct pieces of actionable advice as a bulleted list (using '-').

Do not add any greetings, card summaries, introductory text, concluding remarks, or any other text outside of this strict structure.`
      const user_prompt = `My question is: \"${question}\"\n\nI have drawn these three cards:\n1. ${selectedCards[0].name} - ${selectedCards[0].reversed ? 'REVERSED' : 'UPRIGHT'}\n2. ${selectedCards[1].name} - ${selectedCards[1].reversed ? 'REVERSED' : 'UPRIGHT'}\n3. ${selectedCards[2].name} - ${selectedCards[2].reversed ? 'REVERSED' : 'UPRIGHT'}\n\nPlease provide the reading.`;

      const response = await ollama.chat({
        model: 'mistral',
        messages: [
          {
            role: 'user',
            content: `${system_prompt}\n\n${user_prompt}`,
          },
        ],
        options: {
          temperature: 0.8,
        },
      });
      const newInterpretation = response.message.content;
      const newEntry = { question: question, cards: [...selectedCards], interpretation: newInterpretation, timestamp: Date.now() };
      setConversation(prev => [newEntry, ...prev]);
      setQuestion('');
      setSelectedCards([]);
    } catch (error) {
      console.error('Error getting interpretation:', error);
      alert('Error connecting to the Ollama API. Please make sure Ollama is running and the model is available.');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewSession = () => {
    setConversation([]);
    setQuestion('');
    setSelectedCards([]);
    // No need to initialize a chat with ollama, we can just send messages
    setChat(true);
  };

  const renderParagraphs = (text) => {
    if (!text) return null;
    return text.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => {
        const html = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        return <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: html }}></p>
    });
  };

  const renderList = (text) => {
    if (!text) return null;
    const items = text.split('\n').filter(line => line.trim().startsWith('-'));
    return (
        <ul className="list-disc pl-5 space-y-1 text-purple-100">
            {items.map((item, index) => {
                const html = item.trim().substring(1).trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
                return <li key={index} dangerouslySetInnerHTML={{ __html: html }}></li>;
            })}
        </ul>
    );
  };

  const minorArcana = tarotDeck.filter(card => card.type === "Minor Arcana");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Mystical Tarot Reader
          </h1>
          <p className="text-purple-200">With your guide, Mystica</p>
        </header>

        <main>
          <section className="bg-black/20 backdrop-blur-sm rounded-lg p-6 mb-8" aria-labelledby="question-heading">
            <div className="flex justify-between items-center mb-3">
              <h2 id="question-heading" className="text-lg font-semibold">{conversation.length === 0 ? 'Your Question:' : 'Follow-up Question:'}</h2>
              {conversation.length > 0 && (
                <button onClick={startNewSession} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition-colors">New Session</button>
              )}
            </div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={conversation.length === 0 ? "Ask the cards about love, career, life decisions, or any situation you're facing..." : "Ask a follow-up question to dive deeper into your reading..."}
              className="w-full p-4 rounded-lg bg-white/10 border border-purple-300/30 text-white placeholder-purple-200 resize-none h-24 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              aria-label="Your question for the tarot reading"
            />
          </section>

          <div className="flex justify-center items-center gap-4 mb-6">
            <span className={`font-semibold transition-colors duration-200 ${selectionMode === 'random' ? 'text-white' : 'text-purple-300'}`} aria-hidden="true">Random Draw</span>
            <button type="button" role="switch" aria-checked={selectionMode === 'manual'} onClick={handleToggleChange} className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-indigo-900 ${selectionMode === 'manual' ? 'bg-purple-600' : 'bg-white/20'}`}>
              <span className="sr-only">Use Manual Selection</span>
              <span aria-hidden="true" className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${selectionMode === 'manual' ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`font-semibold transition-colors duration-200 ${selectionMode === 'manual' ? 'text-white' : 'text-purple-300'}`} aria-hidden="true">Manual Selection</span>
          </div>

          {selectionMode === 'random' && (
            <div id="random-panel" role="tabpanel" aria-labelledby="random-draw-tab" className="text-center mb-8">
              <button onClick={drawRandomCards} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto">
                <Shuffle className="w-5 h-5" />Draw 3 Cards
              </button>
            </div>
          )}

          {selectedCards.length > 0 && (
            <section className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-8" aria-labelledby="current-cards-heading">
              <h3 id="current-cards-heading" className="text-xl font-bold mb-4 text-center">Current Cards:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {selectedCards.map((card) => (
                  <div key={card.id} className="bg-gradient-to-br from-purple-700/50 to-pink-700/50 rounded-lg p-4 text-center relative">
                    <div className={`mb-2 transition-transform flex justify-center items-center h-24 ${card.reversed ? 'rotate-180' : ''}`}>
                      {card.type === 'Major Arcana' ? getMajorArcanaIcon(card.name) : getSuitIcon(card.suit)}
                    </div>
                    <h4 className="font-bold text-lg">{card.name}</h4>
                    <p className="text-sm text-purple-200">{card.type}</p>
                    {card.suit && <p className="text-xs text-purple-300">{card.suit}</p>}
                    <div className="mt-2"><span className={`text-xs px-2 py-1 rounded ${card.reversed ? 'bg-red-600' : 'bg-green-600'}`}>{card.reversed ? 'REVERSED' : 'UPRIGHT'}</span></div>
                    {selectionMode === 'manual' && (
                      <button onClick={() => toggleCardOrientation(card.id)} className="mt-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors" aria-label={`Flip ${card.name} card`}>Flip Card</button>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={getInterpretation} disabled={isLoading} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-lg font-bold mr-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Reading Cards...' : conversation.length === 0 ? 'Get Interpretation' : 'Continue Reading'}
                </button>
                <button onClick={clearCurrentCards} className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-bold">Clear Cards</button>
              </div>
            </section>
          )}

          {conversation.length > 0 && (
            <section className="space-y-6" aria-labelledby="conversation-heading">
              <h2 id="conversation-heading" className="text-2xl font-bold text-center text-purple-200 mb-6">Your Tarot Conversation</h2>
              {conversation.map((entry, index) => {
                  const interpretationText = entry.interpretation || '';
                  const adviceHeading = '### Mystica\'s Advice';
                  const answerHeading = '### Answering Your Question';

                  let answeringPart = '';
                  let advicePart = '';

                  if (interpretationText.includes(adviceHeading)) {
                      const parts = interpretationText.split(adviceHeading);
                      answeringPart = parts[0].replace(answerHeading, '').trim();
                      advicePart = parts[1].trim();
                  } else {
                      answeringPart = interpretationText.replace(answerHeading, '').trim();
                  }

                  return (
                    <article key={entry.timestamp} className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-purple-100 mb-2">Reading {conversation.length - index}: "{entry.question}"</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                          {entry.cards.map((card) => (
                            <div key={`${entry.timestamp}-${card.id}`} className="bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-lg p-3 text-center">
                              <div className={`mb-1 transition-transform flex justify-center items-center h-16 ${card.reversed ? 'rotate-180' : ''}`}>
                                  {card.type === 'Major Arcana' ? getMajorArcanaIcon(card.name) : getSuitIcon(card.suit)}
                              </div>
                              <h4 className="font-semibold text-sm">{card.name}</h4>
                              <span className={`text-xs px-1 py-0.5 rounded ${card.reversed ? 'bg-red-600' : 'bg-green-600'}`}>{card.reversed ? 'REV' : 'UPR'}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-purple-200/20 pt-4 space-y-4">
                        <div className="bg-black/20 rounded-lg p-6">
                           <h3 className="text-xl font-bold mb-4 text-purple-100">Card Meanings</h3>
                           <div className="space-y-4">
                            {entry.cards.map((card) => {
                                const meaning = cardMeanings[card.name]?.[card.reversed ? 'reversed' : 'upright'];
                                if (!meaning) return null;
                                return (
                                    <div key={`meaning-${card.id}`}>
                                        <h4 className="text-lg font-semibold text-purple-100">{card.name}: {meaning.keyword}</h4>
                                        <p className="text-purple-200 leading-relaxed">{meaning.description}</p>
                                    </div>
                                )
                            })}
                           </div>
                        </div>

                        {answeringPart && (
                            <div className="bg-black/20 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4 text-purple-100">Answering Your Question</h3>
                                <div className="text-purple-100 leading-relaxed space-y-2">{renderParagraphs(answeringPart)}</div>
                            </div>
                        )}

                        {advicePart && (
                             <div className="bg-black/20 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4 text-purple-100">Mystica's Advice</h3>
                                <div className="text-purple-100 leading-relaxed">{renderList(advicePart)}</div>
                            </div>
                        )}
                      </div>
                    </article>
                  )
              })}
            </section>
          )}

          {selectionMode === 'manual' && (
            <div id="manual-panel" role="tabpanel" aria-labelledby="manual-selection-tab">
              {selectedCards.length < 3 && (
                <div role="status" className="text-center mb-6 bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                  <p className="text-yellow-200">Manual Selection Mode: Click on 3 cards below. ({selectedCards.length}/3 selected)</p>
                </div>
              )}

              <section className="mb-8" aria-labelledby="major-arcana-heading">
                <h2 id="major-arcana-heading" className="text-2xl font-bold mb-4 text-center text-purple-200">Major Arcana</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-3">
                  {majorArcanaData.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => toggleCardSelection(card)}
                      onKeyPress={(e) => e.key === 'Enter' && toggleCardSelection(card)}
                      className={`bg-gradient-to-br from-purple-600/50 to-purple-800/50 rounded-lg text-center cursor-pointer transition-all duration-200 hover:!scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 h-36 ${selectedCards.find(c => c.id === card.id) ? 'ring-4 ring-yellow-400 scale-105' : 'scale-100'}`}
                      tabIndex={0} role="button" aria-pressed={selectedCards.some(c => c.id === card.id)}
                    >
                      <div className="flex flex-col items-center justify-between h-full p-2">
                          <div className="flex items-center justify-center pt-2">
                              {getMajorArcanaIcon(card.name)}
                          </div>
                          <div className="text-xs font-semibold h-8 flex items-center justify-center text-center leading-tight pb-1">{card.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {['Cups', 'Wands', 'Swords', 'Pentacles'].map((suit) => (
                <section key={suit} className="mb-8" aria-labelledby={`${suit}-heading`}>
                  <h2 id={`${suit}-heading`} className={`text-2xl font-bold mb-4 text-center text-purple-200`}> {suit}</h2>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
                    {minorArcana.filter(card => card.suit === suit).map((card) => (
                      <div
                        key={card.id}
                        onClick={() => toggleCardSelection(card)}
                        onKeyPress={(e) => e.key === 'Enter' && toggleCardSelection(card)}
                        className={`bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg text-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 h-36 ${selectedCards.find(c => c.id === card.id) ? 'ring-4 ring-yellow-400 scale-105' : ''}`}
                        tabIndex={0} role="button" aria-pressed={selectedCards.some(c => c.id === card.id)}
                      >
                         <div className="flex flex-col items-center justify-between h-full p-2">
                            <div className="flex items-center justify-center pt-2">{getSuitIcon(suit)}</div>
                            <div className="text-xs font-semibold h-8 flex items-center justify-center text-center leading-tight pb-1">{card.name.replace(` of ${suit}`, '')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TarotApp;
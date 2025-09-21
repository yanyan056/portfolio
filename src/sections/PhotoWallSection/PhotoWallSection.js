import React from 'react';
import Masonry from '../../components/Masonry/Masonry.jsx';
import { useLanguage } from '../../context/LanguageContext';

function PhotoWallSection(){
  const { lang } = useLanguage();

  const photos = [
    {
      id: "1",
      img: '/assets/photos/01.jpg',
      height: 300, 
    },
    {
      id: "2",
      img: "/assets/photos/03.jpg",
      height: 250,
    },
    {
      id: "3",
      img: "/assets/photos/04.jpg",
      height: 200,
    },
    {
      id: "4",
      img: "/assets/photos/20.jpg",
      height: 350,
    },
    {
      id: "5",
      img: "/assets/photos/18.jpg",
      height: 350,
    },
    {
      id: "6",
      img: "/assets/photos/07.jpg",
      height: 350,
    },
    {
      id: "7",
      img: "/assets/photos/08.jpg",
      height: 200,
    },
    {
      id: "8",
      img: "/assets/photos/10.jpg",
      height: 300,
    },
    {
      id: "9",
      img: "/assets/photos/11.jpg",
      height: 250,
    },
    {
      id: "10",
      img: "/assets/photos/19.jpg",
      height: 300,
    },
    {
      id: "11",
      img: "/assets/photos/14.jpg",
      height: 500,
    },
    {
      id: "12",
      img: "/assets/photos/15.jpg",
      height: 450,
    },
    {
      id: "13",
      img: "/assets/photos/16.jpg",
      height: 400,
    },
    {
      id: "14",
      img: "/assets/photos/17.jpg",
      height: 400,
    },
    {
    id: "15",
    img: "/assets/photos/06.jpg", 
    height: 250,
    },
  ];

  // 照片已移动到个人生活板块，此组件暂时隐藏
  return null;
}

export default PhotoWallSection;
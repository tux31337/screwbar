import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import fetch from 'isomorphic-unfetch';
import { useRef } from 'react';
import "../../css/team/quilleditor.css"
import CreateTeam from './CreateTeam';



export default (props) => {
    const { quill, quillRef } = useQuill();
    const [title, setTitle] = useState("");
    const [useUrl, setUseUrl] = useState([]);
    const [deleteUrl, setDeleteUrl] = useState([]);
    const allUrl = useRef([]);

    //multipart
    const config = {
	    header: {'content-type': 'multipart/form-data'}
    }

    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
      };

    //텍스트 에디터에 이미지 올릴 시 실행
    const saveToServer = async (file) => {
        const body = new FormData();
        body.append('img', file);
        const res = await fetch('/team/postImg', { method: 'POST', body });
        res.json().then((result) => {
            allUrl.current.push(result.url);
            insertToEditor(result.url);
        });
    };

    const titleChange = (event) => {
        setTitle(event.target.value);
    }


    //텍스트 에디터에 이미지 올릴 시 실행
    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          saveToServer(file);
        };
      };

    React.useEffect(() => {
    if (quill) {

        quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
    }, [quill]);


    React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {

        });
        }
    }, [quill]);

  return (
    <>
        <article className='quill'>
          <section className='quill__box'>
              <CreateTeam quill={quill} allUrl={allUrl}  />
              <section className='quill__textbox'>
                  <div ref={quillRef} />
              </section>
            </section>
        </article>
    </>
        );
    };
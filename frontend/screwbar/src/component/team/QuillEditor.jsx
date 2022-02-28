import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import fetch from 'isomorphic-unfetch';
import { useRef } from 'react';

export default (props) => {
    const { quill, quillRef } = useQuill();
    const [title, setTitle] = useState("");
    const [useUrl, setUseUrl] = useState([]);
    const [deleteUrl, setDeleteUrl] = useState([]);
    const allUrl = useRef([]);
    const onTitle = (event) => {
        setTitle(event.target.value);
    }

    //multipart
    const config = {
	    header: {'content-type': 'multipart/form-data'}
    }

    //팀작성 시 실행
    const postTeamPosting = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', quill.root.innerHTML);
        if(props.imgFile) {
            formData.append('imgFile', props.imgFile[0]);
        }
        quill.getContents().ops.map(result => {
           if(result.insert.image) {
               const copyArray = useUrl;
               copyArray.push(result.insert.image);
               setUseUrl(copyArray);
           }
        });
        const deleteUrl = allUrl.current.filter(x => ! useUrl.includes(x))
        formData.append('deleteUrl', deleteUrl);
        axios.post("/team/createTeam", formData, config).then((result) => {
            alert(result.data.message);
        }).catch((error) => {
            console.log(error);
        })
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
        //텍스트 에디터에 이미지 올릴 시 실행

        quill.getModule('toolbar').addHandler('image', selectLocalImage);
    }
    }, [quill]);


    React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log(quill.getContents());
        //  console.log(quill.getContents().ops[0]);
        });
        }
    }, [quill]);

  return (
    <>
        <input type="text" onChange={onTitle}></input>
        <div style={{ width: 2000, height: 300 }}>
        <div ref={quillRef} />
        <button onClick={postTeamPosting}>글작성</button>
        </div>
    </>
        );
    };
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import plural from 'plural-ru';

import {CommentIcon} from "../icons/CommentIcon";
import {Comment} from "../comments/Comment";
import {changeCardColOne, createCommentColOne, removeCardColOne} from "../reducer";

type Props = {
    userName: string;
    title: string;
    text: string;
    id: number | null | undefined;
    comments: Array<any>;
    col: string;
}

export const Card = ({userName, title, text, id, col, comments}: Props) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [send, setSend] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newText, setNewText] = useState(text)
    const [commentValue, setCommentValue] = useState('')

    console.log(comments.map(e => e.comment))

    const changeCard = (title: any, text: any) => {
        const card = {
            title,
            text,
            id,
        }
        dispatch(changeCardColOne(card))
    }

    const createComment = (comments: any) => {
        const card = {
            id,
            comments,
        }
        dispatch(createCommentColOne(card))
        setCommentValue('')
    }

    return (
        <>
            <div onClick={() => setOpen(!open)}>
                <div
                    style={{
                        cursor: "pointer",
                        padding: 20,
                        margin: 5,
                        border: "1px solid rgba(0, 0, 0, 0.175)",
                        borderRadius: 8
                    }}>
                    <div
                        style={{
                            fontWeight: 700,
                            wordWrap: "break-word",
                        }}
                    >{title}</div>
                    <div
                        style={{
                            textAlign: 'left',
                            wordWrap: "break-word",
                        }}
                    >{text}</div>
                    <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <div
                            style={{
                                color: 'rgba(0, 0, 0, 0.175)',
                                fontSize: 12,
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                }}>
                                {userName || 'Пользователь'}
                            </div>
                            <div
                                style={{
                                    marginTop: 8,
                                    display: 'flex',
                                    justifyContent: 'left',
                                }}>
                                <CommentIcon/>
                                <div
                                    style={{
                                        marginLeft: 8
                                    }}>
                                    {comments.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal ${open ? '' : 'visibility'}`}
                 style={{
                     overflow: "hidden",
                     display: "block",
                     background: "rgba(0, 0, 0, 0.175)"
                 }} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {change ? (
                                    <textarea
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        style={{
                                            margin: 4,
                                            fontWeight: 700,
                                            height: 30,
                                            width: '100%',
                                            borderRadius: 8,
                                            border: "1px solid rgba(0, 0, 0, 0.175)",
                                        }}
                                        placeholder="Название вашей карточки"
                                    />
                                ) : (
                                    <div>
                                        {title}
                                    </div>
                                )}
                            </h5>
                            <button type="button"
                                    onClick={() => {
                                        setOpen(!open);
                                    }}
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                textAlign: 'left'
                            }}>
                                {change ? (
                                    <textarea
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                        style={{
                                            width: '100%',
                                            minHeight: 200,
                                            margin: 4,
                                            fontWeight: 700,
                                            borderRadius: 8,
                                            border: "1px solid rgba(0, 0, 0, 0.175)",
                                        }}
                                        placeholder=""
                                    />
                                ) : (
                                    <div
                                        style={{
                                            wordBreak: 'break-all'
                                        }}>
                                        {text}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="modal-body">

                            <div
                                style={{
                                    color: 'rgba(0, 0, 0, 0.175)',
                                    fontSize: 12,
                                    textAlign: "left",
                                }}>
                                <div>
                                    Колонка: {col}
                                </div>
                                <div>
                                    Автор: {userName}
                                </div>
                            </div>

                            <div>
                                {comments.length} {plural(comments.length, 'коментарий', 'коментария', 'коментариев')}
                            </div>

                            <div style={{
                                marginTop: 15,
                                display: "flex",
                                alignItems: "center",
                            }}
                            >
                                <textarea
                                    style={{
                                        width: '80%',
                                        borderRadius: 8,
                                        height: 38,
                                        border: "1px solid rgba(0, 0, 0, 0.175)",
                                    }}
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                    placeholder="Написать комментарий"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{
                                        marginLeft: 8
                                    }}
                                    onClick={() => {
                                        createComment(commentValue);
                                        setSend(true)
                                    }}
                                >Отправить
                                </button>
                            </div>

                            {send ? (
                                <div style={{
                                    maxHeight: 500,
                                    overflow: 'auto'
                                }}>
                                    {
                                        comments.map( (e:any, i:any) => {
                                            return (
                                            <Comment
                                                key={i}
                                                userName={userName}
                                                comment={e.comment}
                                            />
                                        )})
                                    }
                                </div>

                            ) : (
                                <></>
                            )}

                        </div>

                        <div className="modal-footer">
                            {change ? (
                                <button type="button"
                                        onClick={() => {
                                            changeCard(newTitle, newText)
                                            setChange(!change)
                                        }}
                                        className="btn btn-primary"
                                >Сохранить
                                </button>
                            ) : (
                                <>
                                    <button type="button"
                                            onClick={() => {
                                                setChange(!change)
                                            }}
                                            className="btn btn-link"
                                    >Изменить карточку
                                    </button>

                                    <button type="button"
                                            onClick={() => {
                                                dispatch(removeCardColOne(Number(id)));
                                                setOpen(!open);
                                            }}
                                            className="btn btn-danger"
                                    >Удалить карточку
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
'use client'
import React, { useState } from 'react'

import { Dosis } from 'next/font/google'
import './style/common.css'

const dosis = Dosis({ subsets: ['latin'] })

export default function Home() {
  const centerTarget = [
    { field: 0, value: '', placeholder: '목표1' },
    { field: 1, value: '', placeholder: '목표2' },
    { field: 2, value: '', placeholder: '목표3' },
    { field: 3, value: '', placeholder: '목표4' },
    { field: 4, value: '', placeholder: '최종 목표', disabled: true, center: true },
    { field: 5, value: '', placeholder: '목표5' },
    { field: 6, value: '', placeholder: '목표6' },
    { field: 7, value: '', placeholder: '목표7' },
    { field: 8, value: '', placeholder: '목표8' },
  ]
  const aroundTarget = [
    { field: 0, value: '', placeholder: '' },
    { field: 1, value: '', placeholder: '' },
    { field: 2, value: '', placeholder: '' },
    { field: 3, value: '', placeholder: '' },
    { field: 4, value: '', placeholder: '목표', disabled: true, center: true },
    { field: 5, value: '', placeholder: '' },
    { field: 6, value: '', placeholder: '' },
    { field: 7, value: '', placeholder: '' },
    { field: 8, value: '', placeholder: '' },
  ]


  const [editArea, setEditArea] = useState(undefined) // 편집 영역
  const [editing, setEditing] = useState(undefined) // 편집 칸

  const onClick = e => {
    if (e.target.parentElement.dataset.code) {
      const codes = e.target.parentElement.dataset.code.split('_')
      const area = codes[1]
      const code = codes[2]

      setEditArea(Number(area))
      setEditing(Number(code))
    }
  }

  /**
   * 빠져나갈 경우 초기화
   */
  const onBlur = e => {
    setEditArea(undefined)
    setEditing(undefined)
  }

  /**
   * 텍스트 정보 변경시 사용
   */
  const onChange = (e, value) => {
    const text = e.target.value
    aroundTarget[editing].value = text
  }

  const inputs = (targets, area) => targets.map(({ field, value, placeholder, center }, key) => {
    const className = `text-box ${center ? '-center' : ''}`

    return (
      <div
        key={key}
        className={className}
        data-code={`box_${area}_${field}`}
        onClick={onClick}
        onBlur={onBlur}
        >
          {
            // 편집중 && 필드가 동일한 경우만 textarea 띄워줌
            editArea !== undefined && editArea === area &&
            editing !== undefined && editing === field
            ?
            <textarea onChange={e => onChange(e, value)} /> :
            <span className={value ? '-value' : '-placeholder'}>{ value || placeholder }</span>
          }
      </div>
    )
  })



  return (
    <div className="wrapper">
      <section className="flex min-h-screen flex-col items-center justify-center space-between my-auto m-auto w-[900px]">
        <h1 className={dosis.className}>2024 My Mandalart</h1>

        <main className="grid grid-cols-3 gap-5">
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 0)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 1)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 2)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 3)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(centerTarget, 4)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 5)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 6)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 7)} </div>
          <div className="box-area grid grid-cols-3"> {inputs(aroundTarget, 8)} </div>
        </main>

        <article>
          <textarea className="box-area w-100"></textarea>
        </article>
      </section>
    </div>
  )
}

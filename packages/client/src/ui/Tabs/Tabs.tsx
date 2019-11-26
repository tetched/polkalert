import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CSS from 'csstype'

import * as S from './styled'

type Tab = {
  text: string
  href: string
}

type Props = {
  tabs: Tab[]
  className?: string
  style?: CSS.Properties
}

const Tabs = ({ tabs, className = '', style }: Props) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState<number>(0)
  const activeRoute = pathname.split('/').pop()

  useEffect(() => {
    setActiveTab(tabs.findIndex(item => item.href === activeRoute))
  }, [pathname])

  return (
    <S.Wrapper className={className} style={style}>
      <S.Inner>
        {tabs.map((item, idx) => (
          <S.Tab
            key={`tabs-link-${idx}`}
            to={item.href}
            activeClassName="active"
            exact
          >
            {item.text}
          </S.Tab>
        ))}
        {activeTab > -1 && (
          <S.ActiveTabBackground
            style={{
              transform: `translateX(${100 * activeTab}%)`
            }}
          />
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default Tabs

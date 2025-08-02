import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

interface Props {
  className?: string
  imageClassName?: string
  titleClassName?: string
}

// 头像预览模态框组件
function AvatarPreview({ isOpen, onClose, imageSrc, alt }: {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
}) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img src={imageSrc} alt={alt} className={styles.previewImage} />
      </div>
    </div>
  )
}

export default function Logo({ className, imageClassName, titleClassName }: Props): JSX.Element {
  const {
    siteConfig: { title },
  } = useDocusaurusContext()
  const { colorMode } = useColorMode()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // 从配置中获取logo信息
  const logoConfig = {
    alt: title,
    src: 'img/logo.webp',
    srcDark: 'img/logo.webp',
  }

  const logoSrc = colorMode === 'dark' && logoConfig.srcDark ? logoConfig.srcDark : logoConfig.src
  const logoImageUrl = logoSrc.startsWith('http') ? logoSrc : `/${logoSrc}`

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPreviewOpen(true)
  }

  return (
    <>
      <Link
        to="/"
        className={clsx('navbar__brand', className)}
        onClick={handleLogoClick}
      >
        {logoSrc && (
          <img
            key={colorMode}
            className={clsx('navbar__logo', imageClassName)}
            src={logoImageUrl}
            alt={logoConfig.alt}
          />
        )}
        {title && (
          <b className={clsx('navbar__title text--truncate', titleClassName)}>
            {title}
          </b>
        )}
      </Link>
      
      <AvatarPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={logoImageUrl}
        alt={logoConfig.alt}
      />
    </>
  )
}
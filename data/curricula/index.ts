import ppa from './ppa.json'
import pca from './pca.json'
import pph from './pph.json'
import pch from './pch.json'
import ifr from './ifr.json'
import multimotor from './multimotor.json'
import ptlaA from './ptla-a.json'
import ptlaH from './ptla-h.json'
import rpa from './rpa.json'
import planeador from './planeador.json'
import lsa from './lsa.json'
import ulm from './ulm.json'
import ultraliviano from './ultraliviano.json'
import globo from './globo.json'
import instructorVuelo from './instructor-vuelo.json'
import ingenieroVuelo from './ingeniero-vuelo.json'
import eov from './eov.json'
import mecanicoMantenimiento from './mecanico-mantenimiento.json'
import supervisorMantenimiento from './supervisor-mantenimiento.json'
import oce from './oce.json'
import tac from './tac.json'

import lessonsPpa from '../lessons/ppa.json'
import lessonsPca from '../lessons/pca.json'
import lessonsPph from '../lessons/pph.json'
import lessonsPch from '../lessons/pch.json'
import lessonsIfr from '../lessons/ifr.json'
import lessonsMultimotor from '../lessons/multimotor.json'
import lessonsPtlaA from '../lessons/ptla-a.json'
import lessonsPtlaH from '../lessons/ptla-h.json'
import lessonsRpa from '../lessons/rpa.json'
import lessonsPlaneador from '../lessons/planeador.json'
import lessonsLsa from '../lessons/lsa.json'
import lessonsUlm from '../lessons/ulm.json'
import lessonsUltraliviano from '../lessons/ultraliviano.json'
import lessonsGlobo from '../lessons/globo.json'
import lessonsInstructorVuelo from '../lessons/instructor-vuelo.json'
import lessonsIngenieroVuelo from '../lessons/ingeniero-vuelo.json'
import lessonsEov from '../lessons/eov.json'
import lessonsMecanicoMantenimiento from '../lessons/mecanico-mantenimiento.json'
import lessonsSupervisorMantenimiento from '../lessons/supervisor-mantenimiento.json'
import lessonsOce from '../lessons/oce.json'
import lessonsTac from '../lessons/tac.json'

export interface CurriculumSubject {
  id: string
  name: string
  description: string
  icon: string
  topics: string[]
}

export interface Curriculum {
  id: string
  code: string
  name: string
  fullName: string
  description: string
  category: string
  approvalThreshold: number
  estimatedQuestions: number
  estimatedTimeMinutes: number
  regulation: string
  subjects: CurriculumSubject[]
}

export interface LessonSubjectMeta {
  id: string
  name: string
  icon: string
  order: number
  lessons: { id: string; title: string; description: string; estimatedMinutes: number; order: number }[]
}

export interface LessonsMeta {
  totalLessons: number
  estimatedTotalHours: number
  subjects: LessonSubjectMeta[]
}

export interface LicensePageData {
  curriculum: Curriculum
  lessons: LessonsMeta
  slug: string
}

const curricula: Curriculum[] = [
  ppa, pca, pph, pch, ifr, multimotor, ptlaA, ptlaH, rpa, planeador,
  lsa, ulm, ultraliviano, globo, instructorVuelo, ingenieroVuelo,
  eov, mecanicoMantenimiento, supervisorMantenimiento, oce, tac,
] as Curriculum[]

const lessonsMap: Record<string, LessonsMeta> = {
  ppa: lessonsPpa as unknown as LessonsMeta,
  pca: lessonsPca as unknown as LessonsMeta,
  pph: lessonsPph as unknown as LessonsMeta,
  pch: lessonsPch as unknown as LessonsMeta,
  ifr: lessonsIfr as unknown as LessonsMeta,
  multimotor: lessonsMultimotor as unknown as LessonsMeta,
  'ptla-a': lessonsPtlaA as unknown as LessonsMeta,
  'ptla-h': lessonsPtlaH as unknown as LessonsMeta,
  rpa: lessonsRpa as unknown as LessonsMeta,
  planeador: lessonsPlaneador as unknown as LessonsMeta,
  lsa: lessonsLsa as unknown as LessonsMeta,
  ulm: lessonsUlm as unknown as LessonsMeta,
  ultraliviano: lessonsUltraliviano as unknown as LessonsMeta,
  globo: lessonsGlobo as unknown as LessonsMeta,
  'instructor-vuelo': lessonsInstructorVuelo as unknown as LessonsMeta,
  'ingeniero-vuelo': lessonsIngenieroVuelo as unknown as LessonsMeta,
  eov: lessonsEov as unknown as LessonsMeta,
  'mecanico-mantenimiento': lessonsMecanicoMantenimiento as unknown as LessonsMeta,
  'supervisor-mantenimiento': lessonsSupervisorMantenimiento as unknown as LessonsMeta,
  oce: lessonsOce as unknown as LessonsMeta,
  tac: lessonsTac as unknown as LessonsMeta,
}

export function getAllLicensePages(): LicensePageData[] {
  return curricula.map((c) => ({
    curriculum: c,
    lessons: lessonsMap[c.id] || { totalLessons: 0, estimatedTotalHours: 0, subjects: [] },
    slug: c.id,
  }))
}

export function getLicenseBySlug(slug: string): LicensePageData | undefined {
  const curriculum = curricula.find((c) => c.id === slug)
  if (!curriculum) return undefined
  return {
    curriculum,
    lessons: lessonsMap[slug] || { totalLessons: 0, estimatedTotalHours: 0, subjects: [] },
    slug,
  }
}

export function getSubjectBySlug(licenseSlug: string, subjectSlug: string) {
  const license = getLicenseBySlug(licenseSlug)
  if (!license) return undefined

  const subject = license.curriculum.subjects.find(
    (s) => slugify(s.name) === subjectSlug || s.id === subjectSlug
  )
  if (!subject) return undefined

  const lessonSubject = license.lessons.subjects.find((ls) => ls.id === subject.id)

  return {
    license,
    subject,
    lessonSubject,
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const categoryLabels: Record<string, string> = {
  personal_de_vuelo: 'Personal de Vuelo',
  personal_de_tierra: 'Personal de Tierra',
}

export const categoryIcons: Record<string, string> = {
  personal_de_vuelo: '✈️',
  personal_de_tierra: '🔧',
}

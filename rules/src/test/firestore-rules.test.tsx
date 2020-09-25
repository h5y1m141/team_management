import {
  apps,
  assertFails,
  assertSucceeds,
  initializeAdminApp,
  initializeTestApp,
  loadFirestoreRules,
} from '@firebase/testing'
import * as fs from 'fs'

const projectId: string = 'pltfrm-dev'

function getFirestore() {
  const app = initializeTestApp({
    projectId,
  })

  return app.firestore()
}

function getFirestoreWithAuth() {
  const app = initializeTestApp({
    projectId,
    auth: {
      uid: 'test_admin_user',
      email: 'test_admin_user@example.com',
    },
  })
  return app.firestore()
}

describe('teamAdminとしてログインしてる場合', () => {
  afterEach(async () => {
    // 使用したアプリの削除
    await Promise.all(apps().map((app) => app.delete()))
  })
  describe('teamsコレクションについて', () => {
    beforeEach(async () => {
      const app = initializeAdminApp({
        projectId,
      })
      const doc = app
        .firestore()
        .collection('teams/team001/admins')
        .doc('test_admin_user')
      doc.set({
        name: 'tarou yamada',
        role: 'teamAdmin',
        teams: ['team001', 'team002'],
      })
      await loadFirestoreRules({
        projectId,
        rules: fs.readFileSync('firestore.rules', 'utf8'),
      })
    })
    describe('認証されてないユーザーの場合', () => {
      test('team一覧を参照できない', async () => {
        const db = await getFirestore()
        const collection = db.collection('/teams')
        await assertFails(collection.get())
      })
      test('任意のbrandを参照できない', async () => {
        const db = await getFirestore()
        const doc = db.collection('/teams').doc('crisp')
        await assertFails(doc.get())
      })
    })
    describe('admin権限のユーザーとしてログインしてる場合', () => {
      test('team一覧を参照できる', async () => {
        const db = await getFirestoreWithAuth()
        const collection = db.collection('/teams')
        await assertSucceeds(collection.get())
      })
      test('任意のteamを参照できる', async () => {
        const db = await getFirestoreWithAuth()
        const doc = db.collection('/teams').doc('crisp')
        await assertSucceeds(doc.get())
      })
    })
  })
})

import {
  BookmarkSimple,
  BookOpen,
  Books,
  UserList,
} from '@phosphor-icons/react'

import { Heading, Text } from '@/components/Typography'
import Avatar from '@/components/Avatar'

import { ProfileData } from '@/pages/profile/[id].page'
import { ProfileDetailsItem } from './ProfileDetailItem'

import { Container, ProfileDetailsWrapper, UserInfo } from './styles'

type ProfileDetailsProps = {
  profile: ProfileData
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  const memberSinceYear = new Date(profile.user.member_since).getFullYear()

  return (
    <Container>
      <UserInfo>
        <Avatar
          size="lg"
          alt={profile.user.name}
          src={profile.user.avatar_url!}
        />
        <Heading size="md" css={{ marginTop: 20 }}>
          {profile.user.name}
        </Heading>
        <Text size="sm" color="gray-400">
          membro desde {memberSinceYear}
        </Text>
      </UserInfo>

      <ProfileDetailsWrapper>
        <ProfileDetailsItem
          icon={<BookOpen />}
          info={profile.readPages}
          label="Páginas lidas"
        />
        <ProfileDetailsItem
          icon={<Books />}
          info={profile.ratedBooks}
          label="Livros avaliados"
        />
        <ProfileDetailsItem
          icon={<UserList />}
          info={profile.readAuthors}
          label="Autores lidos"
        />
        {profile?.mostReadCategory && (
          <ProfileDetailsItem
            icon={<BookmarkSimple />}
            info={profile.mostReadCategory}
            label="Categoria mais lida"
          />
        )}
      </ProfileDetailsWrapper>
    </Container>
  )
}

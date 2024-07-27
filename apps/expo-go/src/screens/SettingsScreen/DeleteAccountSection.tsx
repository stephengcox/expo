import { TrashIcon } from '@expo/styleguide-native';
import { Row, Spacer, Text, useExpoTheme, View } from 'expo-dev-client-components';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';

import { Button } from '../../components/Button';
import { SectionHeader } from '../../components/SectionHeader';

export function DeleteAccountSection() {
  const theme = useExpoTheme();

  async function handleDeleteAccountPressAsync() {
    await WebBrowser.openBrowserAsync('https://expo.dev/settings');
  }

  return (
    <View>
      <SectionHeader header="Delete Account" />
      <View>
        <View bg="default" padding="medium" rounded="large" border="default">
          <Row align="center">
            <TrashIcon color={theme.icon.default} />
            <Spacer.Horizontal size="small" />
            <Text type="InterSemiBold" size="large">
              Delete your account
            </Text>
          </Row>
          <Spacer.Vertical size="small" />
          <Text type="InterRegular" color="secondary" size="medium">
            This action is irreversible. It will delete your personal account, projects, and
            activity.
          </Text>
          <Spacer.Vertical size="small" />
          <Row justify="end">
            <Button
              label="Delete Account"
              theme="error"
              onPress={handleDeleteAccountPressAsync}
              style={{
                alignSelf: 'flex-start',
              }}
            />
          </Row>
        </View>
      </View>
    </View>
  );
}

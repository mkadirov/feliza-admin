import React, { useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { Box, Divider, Grid, styled } from '@mui/material'
import { grey } from '@mui/material/colors'
import AddCategory from '../../components/SettingsComponents/AddCategory'
import AddColor from '../../components/SettingsComponents/AddColor'
import AddBrend from '../../components/SettingsComponents/AddBrend'

function Settings() {

  const [settingType, setSettingType] = useState(1)

  const SettingsButton = styled(Box)(({theme}) => ({
    borderRadius: '10px',
    '&:hover, &.activeButton': {
        backgroundColor:  theme.palette.primary.main,
        color: 'white'
    },
    flex: 1,
    height: '40px',
    backgroundColor: grey[300],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'  
}))

  return (
    <MainLayout>
        <p className="text-4xl mt-12">
            Sozlamalar
        </p>

        <div className="my-5">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SettingsButton onClick={() => setSettingType(1)}>
                Kategoriya
              </SettingsButton>
            </Grid>
            <Grid item xs={4}>
            <SettingsButton onClick={() => setSettingType(2)}>
                Rang
              </SettingsButton>
            </Grid>
            <Grid item xs={4}>
            <SettingsButton onClick={() => setSettingType(3)}>
                Brend
              </SettingsButton>
            </Grid>
          </Grid>

        </div>

        <Divider/>

        <div style={{display: settingType !==1? 'none': 'block'}}>
          <AddCategory/>
        </div>
        <div style={{display: settingType !==2? 'none': 'block'}}>
          <AddColor/>
        </div>
        <div style={{display: settingType !==3? 'none': 'block'}}>
          <AddBrend/>
        </div>
    </MainLayout>
  )
}

export default Settings
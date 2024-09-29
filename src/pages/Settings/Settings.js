import React, { useState } from 'react'
import MainLayout from '../../components/Layout/MainLayout'
import { Box, Divider, Grid, styled } from '@mui/material'
import { grey } from '@mui/material/colors'
import AddCategory from '../../components/SettingsComponents/Category/AddCategory'
import AddColor from '../../components/SettingsComponents/Color/AddColor'
import AddBrend from '../../components/SettingsComponents/Brend/AddBrend'
import AddRegion from '../../components/SettingsComponents/Adress/AddRegion'
import AddSMS from '../../components/SettingsComponents/SMS/AddSMS'

function Settings() {

  const [settingType, setSettingType] = useState(1)

  const SettingsButton = styled(Box)(({theme}) => ({
    borderRadius: '5px',
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
    width: '100%',
    cursor: 'pointer'  
}))

  return (
    <MainLayout>
        <p className="text-4xl mt-12">
            
        </p>

        <div className="mb-5 mt-12">
          <Grid container spacing={1}>
            <Grid item xs={2.4}>
              <SettingsButton className={settingType === 1 ? 'activeButton' : ''} onClick={() => setSettingType(1)}>
                Kategoriya
              </SettingsButton>
            </Grid>
            <Grid item xs={2.4}>
            <SettingsButton className={settingType === 2 ? 'activeButton' : ''} onClick={() => setSettingType(2)}>
                Rang
              </SettingsButton>
            </Grid>
            <Grid item xs={2.4}>
              <SettingsButton className={settingType === 3 ? 'activeButton' : ''} onClick={() => setSettingType(3)}>
                Brend
              </SettingsButton>
            </Grid>
            <Grid item xs={2.4}>
              <SettingsButton className={settingType === 4 ? 'activeButton' : ''} onClick={() => setSettingType(4)}>
                Adress
              </SettingsButton>
            </Grid>
            <Grid item xs={2.4}>
              <SettingsButton className={settingType === 5 ? 'activeButton' : ''} onClick={() => setSettingType(5)}>
                SMS
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
        <div style={{display: settingType !==4? 'none': 'block'}}>
          <AddRegion/>
        </div>
        <div style={{display: settingType !==5? 'none': 'block'}}>
          <AddSMS/>
        </div>
    </MainLayout>
  )
}

export default Settings
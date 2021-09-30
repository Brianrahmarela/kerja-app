import { Card, Row, Col, Avatar, Button, Typography, Divider } from 'antd';
import React, { Component } from 'react'
import { withTranslation } from "react-i18next";
import ImgResume from '../../../../assets/image/img-resume.png';
import AvaApplied from "../../../../assets/image/avatar-applied.png";
import SvgChatPerekrut from "../../../../assets/svg/chat-perekrut.svg";
import SvgApplicant from "../../../../assets/svg/applicant-icon.svg";
import SvgFiles from "../../../../assets/svg/files-icon.svg";

import { Link } from 'react-router-dom';
const { Text } = Typography;
export interface MyResumeProps {
  deskripsiPekerjaan?: any[];
  rekruitmen?: any[];
  informasiLainnya?: any[];
}
export interface MyResumeState {
  deskripsiPekerjaan: any[];
  rekruitmen: any[];
  informasiLainnya: any[];

}

export class MyResume extends Component<MyResumeProps, MyResumeState>  {
  state: MyResumeState = {
    deskripsiPekerjaan: ['Sketch Out Design', 'Research current fashion trends and what consumers like', 'Creating clothing patterns', 'Testing the design on models and people', 'Work with production to see if the design feasible', 'Testing and deciding on fabrics, colors, patterns and textures for each design', 'Maintaining relationships with vendors, suppliers and models', 'Increase knowledge of the fashion industry', 'Develop innovative designs for us'],
    rekruitmen: ['Minimum Bachelor Degree majoring Fashion Design or Fashion Merchandising from reputable university', 'Minimum 1 years experiences in fashion retail industry', 'Having graphic design skills (Illustrator, Photoshop)', 'Good interpersonal with excellent coordination skill', 'Up-to-date in Fashion Trends', 'Active, Creative and Used to tight time schedule', 'Excellent skill in Fashion Design, Fabrics, Textille, Graphics Design and Pattern Making', 'Understand Production Planning Process, Mood Board, Sample'],
    informasiLainnya: [
      {
        id: 1,
        title: 'Posisi',
        keterangan: 'Pegawai',
      },
      {
        id: 2,
        title: 'Kualifikasi Pendidikan',
        keterangan: 'S1 (Sarjana) / D4 (Diploma)',

      },
      {
        id: 3,
        title: 'Dokumen Yang Diperlukan',
        keterangan: ['Ijazah Pendidikan Terakhir', 'SKCK', 'Transport', 'Transkip Nilai'],
      },
      {
        id: 4,
        title: 'Pengalaman Kerja',
        keterangan: '1 tahun',
      },
      {
        id: 5,
        title: 'Status Pekerjaan',
        keterangan: 'Full time (Penuh Waktu) / Kontrak',
      },
      {
        id: 6,
        title: 'Tunjangan',
        keterangan: ['Asuransi Kesehatan (BPJS)', 'Tunjangan Hari Raya / THR', 'Transport', 'Makan siang'],

      },
    ]

  }
  render() {
    const { deskripsiPekerjaan, rekruitmen, informasiLainnya } = this.state;

    return (
      <div>
        <Card bodyStyle={{ padding: 0, borderRadius: 10 }} style={{ borderRadius: 10, }} >
          <Row className="img-container" >
            <img src={ImgResume} alt="imgresume" className="img-cover"></img>
            <Row className="ava-chat-container" justify="space-between">
              {/* <Col xs={7} md={12} lg={19} style={{ backgroundColor: 'darkkhaki' }}> */}
              <Col xs={7} md={12} lg={19}>
                <Avatar shape="square" src={AvaApplied} className="imgList" size={{ xs: 77, sm: 44, md: 124, lg: 124, xl: 128, xxl: 128 }} /></Col>
              {/* <Col xs={15} md={7} lg={5} style={{ backgroundColor: 'darkkhaki' }}> */}
              <Col xs={15} md={7} lg={5}>
                <Link to={`/job/my-jobs-applied`}>
                  {" "}
                  <Button type="primary" icon={<img src={SvgChatPerekrut} alt="svgchatperekrut" style={{ marginRight: 7, }} />} className="btn-chat-perekrut">
                    Chat Perekrut
                  </Button>
                </Link>
              </Col>
            </Row>
          </Row>
          <Row className="title-container" justify="space-between">
            <Col xs={24} md={12}>
              <Row className="title-job-text" >
                Fashion Designer
              </Row>
              <Row className="subtitle-job-text">
                Lorem Boutique
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Row align="middle" justify="end">
                <img src={SvgApplicant} alt="SvgAaplicant" height={10} style={{ marginRight: 9 }} />
                <Text className="applicant-text">123 Applicant</Text>
              </Row>
              <Row justify="end">
                <Text className="time-text">
                  Diposting 5 jam yang lalu
                </Text>
              </Row>
            </Col>
          </Row>
          <Divider style={{ margin: "14px 0px", padding: 0 }} />
          <Row className="title-container">
            <Text className="title-paragraph">Deskripsi Pekerjaan</Text>
          </Row>
          <Row className="list-container">
            {deskripsiPekerjaan.map((item, i) => (
              <>
                <ul key={item.i} style={{ width: '100%', margin: '5px 0px' }}>
                  <li>{item}</li>
                </ul>
              </>
            ))
            }
          </Row>
          <Row className="title-container">
            <Text className="title-paragraph">Rekruitmen</Text>
          </Row>
          <Row className="list-container">
            {rekruitmen.map((item, i) => (
              <>
                <ul key={item.i} style={{ width: '100%', margin: '5px 0px' }}>
                  <li>{item}</li>
                </ul>
              </>
            ))
            }
          </Row>
          <Row className="title-container">
            <Text className="title-paragraph">Informasi Lainnya</Text>
          </Row>
          <Row className="list-container" justify="space-between">
            {
              informasiLainnya.map((item) => (
                <>
                  <Col style={{ width: 250 }}>
                    <Row style={{ color: '#53575E', fontFamily: 'Poppins', fontSize: 15, fontWeight: 500 }}>
                      <Col span={24}>
                        {item.title}
                      </Col>
                    </Row>
                    <Row >
                      <ul style={{ margin: '0px 0px 0px 20px', padding: '2px 0px 38px 0px' }} key={item.id}>
                        {Array.isArray(item.keterangan) ? item.keterangan.map((value: string, idx: number) => (
                          <li style={{ paddingBottom: 4 }}>
                            {value}
                          </li>
                        )) : (
                          <li >
                            {item.keterangan}
                          </li>
                        )}
                      </ul>
                    </Row>
                  </Col>
                </>
              ))
            }
          </Row>
          <Divider style={{ margin: "48px 0px 0px 0px", padding: 0 }} />
          <Row className="list-container">
            <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: "#53575E", fontWeight: 500 }}>Attached Files :</Text>
          </Row>
          <Row style={{ marginTop: 19, marginBottom: 0 }} align="middle" className="attach-container">
            <Link to={`/job/my-jobs-applied/job-alert-settings`}>
              <Row align="middle">
                <Col >
                  <Button type="link" block style={{ padding: 0, margin: 0 }}>
                    <img src={SvgFiles} alt="svgfiles" height={16} style={{ marginRight: 9, }} />
                    SKCK.PDF
                  </Button>
                </Col>
              </Row>
            </Link>
          </Row>
          <Row style={{ marginTop: 0, marginBottom: 0 }} align="middle" className="attach-container">
            <Link to={`/job/my-jobs-applied/job-alert-settings`}>
              <Row align="middle">
                <Col >
                  <Button type="link" block style={{ padding: 0, margin: 0 }}>
                    <img src={SvgFiles} alt="svgfiles" height={16} style={{ marginRight: 9, }} />
                    Transkrip Nilai.PDF
                  </Button>
                </Col>
              </Row>
            </Link>
          </Row>
          <Row style={{ marginTop: 0, marginBottom: 39 }} align="middle" className="attach-container">
            <Link to={`/job/my-jobs-applied/job-alert-settings`}>
              <Row align="middle">
                <Col >
                  <Button type="link" block style={{ padding: 0, margin: 0 }}>
                    <img src={SvgFiles} alt="svgfiles" height={16} style={{ marginRight: 9, }} />
                    Ijazah. PDF
                  </Button>
                </Col>
              </Row>
            </Link>
          </Row>
        </Card>

      </div>
    )
  }
}

export default withTranslation()(MyResume);

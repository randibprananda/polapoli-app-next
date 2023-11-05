import { Row, Col, Button, Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Download, Send, Edit, Delete } from 'react-iconly';
import { colors } from '../../../theme';
import { dateFormat, RenderIf } from '../../../utils';
import { ButtonCopyToClipboard } from '../../atoms';
import Props from './feedItem.props';

const FeedItem: React.FC<Props> = ({
  src,
  title,
  onDownload,
  date,
  content,
  onEdit,
  onDelete,
  onShare,
  withShare = true,
  disabled = false,
  total = 0,
  url,
  linkToCopy = ''
}) => {
  return (
    <div className="rounded-xl bg-white p-6 mb-6 max-w-1000">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <div className="relative w-full lg:max-w-80">
            <Image
              src={src}
              alt={title}
              width={330}
              height={330}
              loading="lazy"
              objectFit="cover"
              className="rounded-lg"
              layout="responsive"
            />
            <Button
              type="primary"
              size="middle"
              className=" absolute top-4 right-4 bg-rose hover:bg-rose border-rose hover:border-rose ml-2"
              onClick={onDownload}
              disabled={disabled}
            >
              <p className="flex justify-between items-center">
                <Download set="bold" size={16} primaryColor={colors.white} />{' '}
                <span className="ml-2">Download Gambar</span>
              </p>
            </Button>
          </div>
        </Col>
        <Col xs={24} lg={16}>
          <div className="h-full w-full flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="font-bold text-xl mb-1">{title}</h3>
              <span className="inline-block font-semibold text-xs text-grey1 mb-2">
                {dateFormat(date)}
              </span>
              <p className="text-base font-normal">{content}</p>
            </div>
            <div className="flex flex-col">
              <Link href={url || ''}>
                <a className="text-rose text-sm self-end mb-3 font-semibold">
                  {total} kali dibagikan
                </a>
              </Link>
              <div className="text-right">
                <RenderIf isTrue={withShare}>
                  <ButtonCopyToClipboard textToCopy={linkToCopy} />
                  <Button
                    type="default"
                    size="middle"
                    className=" border-grey1 hover:border-grey1 ml-2"
                    onClick={onShare}
                    disabled={disabled}
                  >
                    <p className="flex justify-between items-center text-grey1">
                      <Send set="light" size={16} primaryColor={colors.grey1} />{' '}
                      <span className="ml-2">Bagikan</span>
                    </p>
                  </Button>
                </RenderIf>
                <Button
                  type="primary"
                  size="middle"
                  className="bg-success hover:bg-success border-success hover:border-success ml-2"
                  onClick={onEdit}
                  disabled={disabled}
                >
                  <p className="flex justify-between items-center">
                    <Edit set="light" size={16} primaryColor={colors.white} />{' '}
                    <span className="ml-2">Edit</span>
                  </p>
                </Button>
                <Button
                  type="primary"
                  size="middle"
                  className="ml-2"
                  danger
                  onClick={onDelete}
                  disabled={disabled}
                >
                  <p className="flex justify-between items-center">
                    <Delete set="bold" size={16} primaryColor={colors.white} />{' '}
                    <span className="ml-2">Hapus</span>
                  </p>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeedItem;

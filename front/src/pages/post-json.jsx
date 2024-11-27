import React, { useState } from 'react';
import { Typography, Divider } from 'antd';
import { UploadForm } from '../components';
import '../assets/PostJson.scss';

const { Title, Paragraph } = Typography;

export const PostJson = () => {
  const [files, setFiles] = useState(null);

  /*
    const beforeUpload = (file) =>{
        return file.type === "application/json"
    }

    const handleChange = (info) =>{
        if(info.file.status === "done"){
            message.success(info.file)
        }else{
            message.error(info.file)
        }
    }
    const uploadProps = {
        name : "file",
        action : "http://localhost:3000/post-project",
        beforeUpload : beforeUpload,
        onChange : handleChange
    }*/

  const handleChange = e => {
    console.log(e);
  };

  return (
    <>
      <div className='post-json'>
        <Title level='1'>Poster un projet</Title>
        <Divider />
        <div id='instruction'>
          <Title level='5'>Consigne</Title>
          <Paragraph>
            Lorsque vous souhaitez poster un projet assurer vous :{' '}
          </Paragraph>
          <ul>
            <li>{"Qu'il soit au format json"}</li>
            <li> {"Qu'il respect la structure suivante ci-dessous"}</li>
          </ul>
          <pre>
            {`
    {
        version: String,
        project: String,
        date: String,
        team: String,
        stats: Object 
    }
`}
          </pre>

          <Title level='5'>Example</Title>
          <pre>
            {`
{   
  "version": "4.1.0",
  "project": "new-dashboard",
  "date": "15/02/2024_14h30",
  "team": "Alpha Squad",
  "stats": {
    "Dashboard": {
      "count": 2,
      "props": {
        "theme": {
          "dark": 1,
          "light": 1
        },
        "layout": {
          "fluid": 1,
          "fixed": 1
        }
      },
      "children": {
        "Widget": 4,
        "Footer": 1
      }
    },
    "Widget": {
      "count": 4,
      "props": {
        "type": {
          "chart": 2,
          "summary": 2
        }
      },
      "children": {
        "Chart": 2
      }
    },
    "Footer": {
      "count": 1,
      "props": {
        "copyright": {
          "true": 1
        }
      },
      "children": {}
    },
    "Chart": {
      "count": 2,
      "props": {
        "chartType": {
          "bar": 1,
          "line": 1
        }
      },
      "children": {}
    },
    "NavigationBar": {
      "count": 1,
      "props": {},
      "children": {
        "NavItem": 3
      }
    },
    "NavItem": {
      "count": 3,
      "props": {
        "active": {
          "true": 1,
          "false": 2
        }
      },
      "children": {}
    },
    "ProfileCard": {
      "count": 1,
      "props": {
        "user": {
          "unreadableValue": 1
        },
        "showDetails": {
          "true": 1
        }
      },
      "children": {
        "Avatar": 1,
        "UserInfo": 1
      }
    },
    "Avatar": {
      "count": 1,
      "props": {
        "size": {
          "large": 1
        }
      },
      "children": {}
    },
    "UserInfo": {
      "count": 1,
      "props": {
        "displayEmail": {
          "true": 1
        }
      },
      "children": {}
    },
    "SearchBar": {
      "count": 1,
      "props": {
        "placeholder": {
          "Search...": 1
        }
      },
      "children": {}
    },
    "Modal": {
      "count": 1,
      "props": {
        "isOpen": {
          "false": 1
        },
        "size": {
          "medium": 1
        }
      },
      "children": {
        "ModalHeader": 1,
        "ModalBody": 1,
        "ModalFooter": 1
      }
    },
    "ModalHeader": {
      "count": 1,
      "props": {
        "title": {
          "Settings": 1
        }
      },
      "children": {}
    },
    "ModalBody": {
      "count": 1,
      "props": {},
      "children": {
        "Form": 1
      }
    },
    "ModalFooter": {
      "count": 1,
      "props": {},
      "children": {
        "Button": 2
      }
    },
    "Form": {
      "count": 1,
      "props": {
        "onSubmit": {
          "function": 1
        }
      },
      "children": {
        "Input": 3,
        "Checkbox": 2
      }
    },
    "Input": {
      "count": 3,
      "props": {
        "type": {
          "text": 2,
          "email": 1
        }
      },
      "children": {}
    },
    "Checkbox": {
      "count": 2,
      "props": {
        "checked": {
          "false": 2
        }
      },
      "children": {}
    },
    "Button": {
      "count": 2,
      "props": {
        "variant": {
          "primary": 1,
          "secondary": 1
        }
      },
      "children": {}
    }
  }
}`
}
          </pre>
        </div>
        <UploadForm />
      </div>
    </>
  );
};
